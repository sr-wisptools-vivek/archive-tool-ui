Tracker.autorun(function() {
    if (!Meteor.user()) {
        Session.set('myarchives', []);
        Session.set('autoarchives', []);
        Session.set('servicedropbox', []);
        Session.set('servicegoogledrive', []);
        Session.set('serviceonedrive', []);
        Session.set('servicefacebook', []);
        Session.set('serviceflickr', []);
    } else {
        var myarchive = MyArchives.findOne({userId: Meteor.userId()});
        if (myarchive && myarchive.archiveData.length) {
            Session.set('myarchives', myarchive.archiveData);
        }
        var autoarchive = AutoArchives.findOne({userId: Meteor.userId()});
        console.log(autoarchive);
        if (autoarchive && autoarchive.archiveData.length) {
            Session.set('autoarchives', autoarchive.archiveData);
        }
    }
});