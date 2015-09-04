DropboxOAuth = {};

OAuth.registerService('dropbox', 2, null, function (query) {
    var response = getTokens(query);
    var accessToken = response.accessToken;
    var identity = getIdentity(accessToken);

    var serviceData = {
        id: identity.uid,
        accessToken: accessToken,
        expiresAt: (+new Date()) + (1000 * response.expiresIn)
    };

    return {
        serviceData: serviceData,
        options: {
            profile: {
                display_name: identity.display_name,
                country: identity.country,
                email: identity.email
            }
        }
    };
});

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
var getTokens = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'dropbox'});
    if (!config)
        throw new ServiceConfiguration.ConfigError();

    var response;
    try {
        response = HTTP.post(
                "https://api.dropbox.com/1/oauth2/token", {params: {
                        code: query.code,
                        client_id: config.clientId,
                        client_secret: OAuth.openSecret(config.secret),
                        redirect_uri: OAuth._redirectUri('dropbox', config, {}, {secure: true}),
                        grant_type: 'authorization_code'
                    }});
    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with Dropbox. " + err.message),
                {response: err.response});
    }

    if (response.data.error) { // if the http response was a json object with an error attribute
        throw new Error("Failed to complete OAuth handshake with Dropbox. " + response.data.error);
    } else {
        return {
            accessToken: response.data.access_token,
            expiresIn: response.data.expires_in
        };
    }
};

var getIdentity = function (accessToken) {
    try {
        return Meteor.http.get("https://api.dropbox.com/1/account/info", {
            headers: {Authorization: 'Bearer ' + accessToken}
        }).data;
    } catch (err) {
        throw new Error("Failed to fetch identity from dropbox. " + err.message);
    }
};

DropboxOAuth.retrieveCredential = function (credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};

var listDirectory = function(accessToken) {
    var response;
    try {
        response = HTTP.post(
            "https://api.dropboxapi.com/1/delta", {
            headers: {Authorization: 'Bearer ' + accessToken},
            params: {
                path_prefix: '/'    
            }
        });
    } catch (err) {
        console.log(err);
        return false;
    }
    
    if (response.statusCode == 200) {
        return JSON.parse(response.content);
    }
    return false;
};

var formatDirList = function(list) {
    if (list.entries && list.entries.length>0) {
        var dropboxcontent = {
            source: {
                name: 'dropbox',
                url: 'https://www.dropbox.com/en/'
            },
            data: []
        };
        for (i in list.entries) {
            dropboxcontent.data.push({
                type: list.entries[i][1].is_dir?'folder':'file',
                name: list.entries[i][1].path.split('/')[list.entries[i][1].path.split('/').length-1],
                path: list.entries[i][1].path.split('/').slice(0,-1).join('/')==""?'/':list.entries[i][1].path.split('/').slice(0,-1).join('/'),
                size: list.entries[i][1].bytes
            });
        }
        return dropboxcontent;
    }
    return false;
};

DropboxOAuth.listDirectory = function (accessToken) {
    var list = listDirectory(accessToken);
    list = formatDirList(list);
    return list;
};

DropboxOAuth.getPendingCredential = function (credentialToken) {
    var pendingCredential = OAuth._pendingCredentials.findOne({key: credentialToken});
    if (pendingCredential) {
        return pendingCredential.credential;
    }
    return false;
};