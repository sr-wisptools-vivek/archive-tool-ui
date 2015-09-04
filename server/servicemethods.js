Meteor.methods({
    servicedropbox: function() {
        var userId = Meteor.userId();
        var cloudServiceAccessToken = CloudServiceAccessTokens.findOne({userId: userId, servicename: 'dropbox'});
        if (cloudServiceAccessToken && cloudServiceAccessToken.credential.serviceData.accessToken) {
            return DropboxOAuth.listDirectory(cloudServiceAccessToken.credential.serviceData.accessToken);
        }
        return [];
    },
    servicegoogledrive: function() {
        return googledrivecontent;
    },
    serviceonedrive: function() {
        return onedrivecontent;
    },
    servicefacebook: function() {
        return facebookcontent;
    },
    serviceflickr: function() {
        return flickrcontent;
    }
});