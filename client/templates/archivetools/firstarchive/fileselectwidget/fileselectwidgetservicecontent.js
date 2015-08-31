Template.fileSelectWidgetServiceContent.events({
    'click .serviceconnectbutton': function(e) {
        var serviceName = $(e.currentTarget).parent().parent().attr('id');
        Meteor.call(serviceName, function(error, result) {
            if (result) {
                Session.set(serviceName, result);
                Session.set(serviceName+"_navigationRoot", "/");
            }
        });
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