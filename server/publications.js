Meteor.publish('myarchives', function () {
    return MyArchives.find();
});