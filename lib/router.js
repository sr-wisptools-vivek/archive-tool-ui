Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'pageNotFound'
});

Router.route('/', {name: 'firstArchive'});

var requireLogin = function() {
    if (!Meteor.user()) {
        this.render('accessDenied');
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin);