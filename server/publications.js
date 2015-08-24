Meteor.publish('myarchives', function () {
    var userId = this.userId;
    return MyArchives.find({userId: userId});
});