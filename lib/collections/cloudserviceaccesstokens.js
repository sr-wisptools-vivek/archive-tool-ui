CloudServiceAccessTokens = new Mongo.Collection('cloudserviceaccesstokens');

Meteor.methods({
    updateCloudServiceAccessToken: function(credentialToken, servicename) {
        var pendingCredential = DropboxOAuth.getPendingCredential(credentialToken);
        var userId = Meteor.userId();
        if (CloudServiceAccessTokens.findOne({userId: userId, servicename: servicename})) {
            CloudServiceAccessTokens.update(
                {userId: userId, servicename: servicename},
                {$set: {credential: pendingCredential}}
            );
        } else {
            CloudServiceAccessTokens.insert({
                userId: userId,
                servicename: servicename,
                credential: pendingCredential
            });
        }
    }
});