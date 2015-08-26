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
    },
    fileLocation: function(path, filename) {
        if (path[path.length-1]=="/") {
            return path+filename;
        }
        return path+"/"+filename;
    }
});