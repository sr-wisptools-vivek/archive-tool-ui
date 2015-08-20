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

Template.fileSelectWidgetServiceContentTable.helpers({
    faicon: function(type, filename) {
        if (type == 'folder') {
            return 'folder';
        } else {
            var ext = filename.split('.')[filename.split('.').length-1];
            switch(ext.toLowerCase()) {
                case 'png':
                case 'jpg':
                case 'jpeg':
                case 'gif':
                    return 'file-image-o';
                    break;
                    
                /* More file types can be defined later */
                
                default:
                    return 'file-o';
                    break;
            }
        }
    },
    addedToMyArchives: function(service, path, filename) {
        return addedToMyArchives(service, path, filename);
    }
});

Template.fileSelectWidgetServiceContentTable.events({
    'click .service-content-add-remove': function(e) {
        if(addedToMyArchives(this.type, this.path, this.name)) {
            removeFromMyArchives(this.type, this.path, this.name);
        } else {
            addtoMyArchives(this.type, this.path, this.name);
        }
    }
});

addtoMyArchives = function(service, path, filename) {
    var myarchives = Session.get('myarchives');
    if (!myarchives) {
        myarchives = new Array();
    }
    myarchives.push({
        service: service,
        path: path,
        filename: filename
    });
    Session.set('myarchives', myarchives);
    
    /* Update Collection */
};

removeFromMyArchives = function(service, path, filename) {
    var myarchives = Session.get('myarchives');
    if (myarchives) {
        for (i in myarchives) {
            if (myarchives[i].service==service && myarchives[i].path==path && myarchives[i].filename==filename) {
                myarchives.splice(i, 1);
            }
        }
    }
    Session.set('myarchives', myarchives);
    
    /* Update Collection */
};

addedToMyArchives = function(service, path, filename) {
    var myarchives = Session.get('myarchives');
    if (myarchives) {
        for (i in myarchives) {
            if (myarchives[i].service==service && myarchives[i].path==path && myarchives[i].filename==filename) {
                return true;
            }
        }
    }
    return false;
};