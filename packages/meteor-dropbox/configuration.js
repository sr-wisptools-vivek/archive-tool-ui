ServiceConfiguration.configurations.upsert(
    {service: "dropbox"},
    {
        $set: {
            clientId: Meteor.settings.dropbox.appkey,
            loginStyle: "popup",
            secret: Meteor.settings.dropbox.appsecret
        }
    }
);