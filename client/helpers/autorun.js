Tracker.autorun(function() {
    if (!Meteor.user()) {
        Session.set('myarchives', []);
        Session.set('autoarchives', []);
        var service_list = ["servicedropbox", "servicegoogledrive", "serviceonedrive", "servicefacebook", "serviceflickr"];
        for (i in service_list) {
            Session.set(service_list[i], []);
            Session.set(service_list[i]+"_navigationRoot", []);
        }
    } else {
        var myarchive = MyArchives.findOne({userId: Meteor.userId()});
        if (myarchive && myarchive.archiveData.length) {
            Session.set('myarchives', myarchive.archiveData);
        }
        var autoarchive = AutoArchives.findOne({userId: Meteor.userId()});
        if (autoarchive && autoarchive.archiveData.length) {
            Session.set('autoarchives', autoarchive.archiveData);
        }
    }
});