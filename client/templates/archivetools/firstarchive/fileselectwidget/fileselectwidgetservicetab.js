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