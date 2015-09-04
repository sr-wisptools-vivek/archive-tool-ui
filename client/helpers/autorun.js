Tracker.autorun(function() {
    if (!Meteor.user()) {
        Session.set('myarchives', []);
        Session.set('autoarchives', []);
        var service_list = ["servicedropbox", "servicegoogledrive", "serviceonedrive", "servicefacebook", "serviceflickr"];
        for (i in service_list) {
            Session.set(service_list[i], []);
            Session.set(service_list[i]+"_navigationRoot", []);
            Session.set(service_list[i]+"_requireRefresh", true);
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
        
        var service_list = ["servicedropbox", "servicegoogledrive", "serviceonedrive", "servicefacebook", "serviceflickr"];
        for (i in service_list) {
            if (Session.get(service_list[i]+"_requireRefresh")) {
                Meteor.call(service_list[i], function (error, result) {
                    if (result && result.source && result.data) {
                        Session.set("service" + result.source.name, result);
                        Session.set("service" + result.source.name + "_navigationRoot", "/");
                    }
                });
                Session.set(service_list[i]+"_requireRefresh", false);
            }
        }
    }
});