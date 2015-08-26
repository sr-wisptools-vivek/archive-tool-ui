addtoMyArchives = function(service, fileDataObject) {
    var myarchives = Session.get('myarchives');
    if (!myarchives) {
        myarchives = new Array();
    }
    myarchives.push({
        service: service,
        fileData: fileDataObject
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

addtoAutoArchives = function(service, fileDataObject) {
    var autoarchives = Session.get('autoarchives');
    if (!autoarchives) {
        autoarchives = new Array();
    }
    autoarchives.push({
        service: service,
        fileData: fileDataObject
    });
    Session.set('autoarchives', autoarchives);
    
    Meteor.call('updateAutoArchives', autoarchives, function(error, result) {
        if (error) {
            console.log(error.reason);
        }
    });
};

removeFromAutoArchives = function(service, fileDataObject) {
    var autoarchives = Session.get('autoarchives');
    if (autoarchives) {
        for (i in autoarchives) {
            if (autoarchives[i].service==service && autoarchives[i].fileData.type==fileDataObject.type && autoarchives[i].fileData.path==fileDataObject.path && autoarchives[i].fileData.name==fileDataObject.name) {
                autoarchives.splice(i, 1);
            }
        }
    }
    Session.set('autoarchives', autoarchives);
    
    Meteor.call('updateAutoArchives', autoarchives, function(error, result) {
        if (error) {
            console.log(error.reason);
        }
    });
};

addedToAutoArchives = function(service, fileDataObject) {
    var autoarchives = Session.get('autoarchives');
    if (autoarchives) {
        for (i in autoarchives) {
            if (autoarchives[i].service==service && autoarchives[i].fileData.type==fileDataObject.type && autoarchives[i].fileData.path==fileDataObject.path && autoarchives[i].fileData.name==fileDataObject.name) {
                return true;
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