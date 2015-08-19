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