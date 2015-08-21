MyArchives = new Mongo.Collection('myarchives');

Meteor.methods({
    updateMyArchives: function(myarchives) {
        var userId = 1; //TODO: Change when user authentication is implemented
        if (MyArchives.findOne({userId: userId})) {
            MyArchives.update(
                {userId: userId},
                {$set: {archiveData: myarchives}}
            );
        } else {
            MyArchives.insert({
                userId: userId,
                archiveData: myarchives
            });
        }
    }
});