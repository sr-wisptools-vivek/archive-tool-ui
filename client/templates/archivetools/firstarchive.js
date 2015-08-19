Template.fileSelectWidgetMyArchive.events({
    'click .myarchivesummary': function(e) {
        if ($('#firstarchive .myarchivesummary').eq(0).hasClass('expanded')) {
            $('#firstarchive .servicecontent').eq(0).slideDown();
            $('#firstarchive .myarchivecontent').eq(0).slideUp();
            $('#firstarchive .myarchivesummary').eq(0).removeClass('expanded');
        } else {
            $('#firstarchive .servicecontent').eq(0).slideUp();
            $('#firstarchive .myarchivecontent').eq(0).slideDown();
            $('#firstarchive .myarchivesummary').eq(0).addClass('expanded');
        }
    },
    
    'click #myarchivename': function(e) {
        e.stopPropagation();
    }
});

Template.fileSelectWidgetServiceTab.events({
    'click .servicetabitem': function(e) {
        if ($('#firstarchive .myarchivesummary').eq(0).hasClass('expanded')) {
            $('#firstarchive .servicecontent').eq(0).slideDown();
            $('#firstarchive .myarchivecontent').eq(0).slideUp();
            $('#firstarchive .myarchivesummary').eq(0).removeClass('expanded');
        }
        $('.servicetabitem').removeClass('selected');
        $(e.currentTarget).addClass('selected');
        var service = $(e.currentTarget).find('p').eq(0).html();
        $('.servicecontentitem').hide();
        $('#service'+service.replace(' ', '').toLowerCase()).show();
    }
});

Template.fileSelectWidgetServiceContent.events({
    'click .serviceconnectbutton': function(e) {
        var serviceName = $(e.currentTarget).parent().parent().attr('id');
        Meteor.call(serviceName, function(error, result) {
            if (result)
                Session.set(serviceName, result);
        });
    }
});

Template.fileSelectWidgetServiceContent.helpers({
    dropboxcontent: function() {
        return Session.get('servicedropbox');
    },
    googledrivecontent: function() {
        return Session.get('servicegoogledrive');
    },
    onedrivecontent: function() {
        return Session.get('serviceonedrive');
    },
    facebookcontent: function() {
        return Session.get('servicefacebook');
    },
    flickrcontent: function() {
        return Session.get('serviceflickr');
    }
});