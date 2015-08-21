Meteor.publish('myarchives', function () {
    var userId = 1; //TODO: Change when user authentication is implemented
    return MyArchives.find({userId: userId});
});