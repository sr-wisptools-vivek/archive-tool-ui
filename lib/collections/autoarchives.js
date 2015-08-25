AutoArchives = new Mongo.Collection('autoarchives');

Meteor.methods({
    updateAutoArchives: function(autoarchives) {
        var userId = Meteor.userId();
        if (AutoArchives.findOne({userId: userId})) {
            AutoArchives.update(
                {userId: userId},
                {$set: {archiveData: autoarchives}}
            );
        } else {
            AutoArchives.insert({
                userId: userId,
                archiveData: autoarchives
            });
        }
    }
});