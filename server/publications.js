Meteor.publish('myarchives', function () {
    var userId = this.userId;
    return MyArchives.find({userId: userId});
});

Meteor.publish('autoarchives', function () {
    var userId = this.userId;
    return AutoArchives.find({userId: userId});
});