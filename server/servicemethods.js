Meteor.methods({
    servicedropbox: function() {
        return dropboxcontent;
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