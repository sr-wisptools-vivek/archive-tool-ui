Template.fileSelectWidgetServiceContent.events({
    'click .serviceconnectbutton': function(e) {
        var serviceName = $(e.currentTarget).parent().parent().attr('id');
        
        switch (serviceName) {
            case 'servicedropbox':
                DropboxOAuth.requestCredential(function(e) {
                    if (e) {
                        Meteor.call('updateCloudServiceAccessToken', e, 'dropbox', function(error, result) {
                            console.log('Authenticated');
                            Meteor.call(serviceName, function (error, result) {
                                if (result) {
                                    Session.set(service_list[i], result);
                                    Session.set(service_list[i] + "_navigationRoot", "/");
                                }
                            });
                        });
                    }
                });
                break;
        }
    }
});

Template.fileSelectWidgetServiceContent.helpers({
    dropboxcontent: function() {
        return Session.get('servicedropbox');
    },
    googledrivecontent: function() {
        return Session.get('servicegoogledrive');
    },
    onedrivecontent: function() {
        return Session.get('serviceonedrive');
    },
    facebookcontent: function() {
        return Session.get('servicefacebook');
    },
    flickrcontent: function() {
        return Session.get('serviceflickr');
    }
});