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
    },
    
    'click .myarchive-content-remove i': function(e) {
        removeFromMyArchives(this.service, this.fileData);
    }
});

Template.fileSelectWidgetMyArchive.helpers({
    myarchives: function() {
        var userId = Meteor.userId();
        var myarchive = MyArchives.findOne({userId: userId});
        if (myarchive) {
            return myarchive.archiveData;
        }
    },
    faicon: function(type, filename) {
        return getFontAwesomeIcon(type, filename);
    },
    displaySize: function(size) {
        if (size<1024) {
            return '< 1 KB';
        } else if(size<1024*1024) {
            return Math.ceil(size/1024) + ' KB';
        } else if(size<1024*1024*1024) {
            return Math.ceil(size/1024/1024) + ' MB';
        } else if(size<1024*1024*1024*1024) {
            return Math.ceil(size/1024/1024/1024) + ' GB';
        } else {
            return Math.ceil(size/1024/1024/1024/1024) + ' TB';
        }
    },
    diskUsed: function() {
        var userId = Meteor.userId();
        var myarchive = MyArchives.findOne({userId: userId});
        var sum = 0;
        if (myarchive && myarchive.archiveData && myarchive.archiveData.length>0) {
            for (i in myarchive.archiveData) {
                sum += myarchive.archiveData[i].fileData.size;
            }
        }
        return Math.ceil(sum/1024/1024/1024);
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
        return getFontAwesomeIcon(type, filename);
    },
    addedToMyArchives: function(service, path, filename) {
        return addedToMyArchives(service, path, filename);
    },
    autoArchiveEnabled: function(service, path, filename) {
        return autoArchiveEnabled(service, path, filename);
    }
});

Template.fileSelectWidgetServiceContentTable.events({
    'click .service-content-add-remove i': function(e) {
        var dataObject = Template.currentData();
        var autoArchive = $(e.target).parent().next().find('i').hasClass('fa-check-square-o');
        if(addedToMyArchives(dataObject.source.name, this)) {
            removeFromMyArchives(dataObject.source.name, this);
        } else {
            addtoMyArchives(dataObject.source.name, this, autoArchive);
        }
    },
    
    'click .service-content-auto-archive i': function(e) {
        var dataObject = Template.currentData();
        if ($(e.target).hasClass('fa-check-square-o')) {
            $(e.target).removeClass('fa-check-square-o');
            $(e.target).addClass('fa-square-o');
            updateAutoArchiveStat(dataObject.source.name, this, false);
        } else {
            $(e.target).removeClass('fa-square-o');
            $(e.target).addClass('fa-check-square-o');
            updateAutoArchiveStat(dataObject.source.name, this, true);
        }
    }
});

addtoMyArchives = function(service, fileDataObject, autoArchive) {
    var myarchives = Session.get('myarchives');
    if (!myarchives) {
        myarchives = new Array();
    }
    myarchives.push({
        service: service,
        fileData: fileDataObject,
        autoArchive: autoArchive
    });
    Session.set('myarchives', myarchives);
    
    Meteor.call('updateMyArchives', myarchives, function(error, result) {
        if (error) {
            console.log(error.reason);
        }
    });
};

removeFromMyArchives = function(service, fileDataObject) {
    var myarchives = Session.get('myarchives');
    if (myarchives) {
        for (i in myarchives) {
            if (myarchives[i].service==service && myarchives[i].fileData.type==fileDataObject.type && myarchives[i].fileData.path==fileDataObject.path && myarchives[i].fileData.name==fileDataObject.name) {
                myarchives.splice(i, 1);
            }
        }
    }
    Session.set('myarchives', myarchives);
    
    Meteor.call('updateMyArchives', myarchives, function(error, result) {
        if (error) {
            console.log(error.reason);
        }
    });
};

addedToMyArchives = function(service, fileDataObject) {
    var myarchives = Session.get('myarchives');
    if (myarchives) {
        for (i in myarchives) {
            if (myarchives[i].service==service && myarchives[i].fileData.type==fileDataObject.type && myarchives[i].fileData.path==fileDataObject.path && myarchives[i].fileData.name==fileDataObject.name) {
                return true;
            }
        }
    }
    return false;
};

autoArchiveEnabled = function(service, fileDataObject) {
    var myarchives = Session.get('myarchives');
    if (myarchives) {
        for (i in myarchives) {
            if (myarchives[i].service==service && myarchives[i].fileData.type==fileDataObject.type && myarchives[i].fileData.path==fileDataObject.path && myarchives[i].fileData.name==fileDataObject.name) {
                if (myarchives[i].autoArchive) {
                    return true;
                }
            }
        }
    }
    return false;
};

updateAutoArchiveStat = function(service, fileDataObject, status) {
    var myarchives = Session.get('myarchives');
    if (myarchives) {
        for (i in myarchives) {
            if (myarchives[i].service==service && myarchives[i].fileData.type==fileDataObject.type && myarchives[i].fileData.path==fileDataObject.path && myarchives[i].fileData.name==fileDataObject.name) {
                myarchives[i].autoArchive = status;
                Session.set('myarchives', myarchives);
    
                Meteor.call('updateMyArchives', myarchives, function(error, result) {
                    if (error) {
                        console.log(error.reason);
                    }
                });
            }
        }
    }
    return false;
};

getFontAwesomeIcon = function(type, filename) {
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
};