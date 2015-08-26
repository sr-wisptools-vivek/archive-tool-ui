Template.fileSelectWidgetServiceContentTable.helpers({
    faicon: function(type, filename) {
        return getFontAwesomeIcon(type, filename);
    },
    addedToMyArchives: function(service, path, filename) {
        return addedToMyArchives(service, path, filename);
    },
    addedToAutoArchives: function(service, path, filename) {
        return addedToAutoArchives(service, path, filename);
    }
});

Template.fileSelectWidgetServiceContentTable.events({
    'click .service-content-add-remove i': function(e) {
        var dataObject = Template.currentData();
        if(addedToMyArchives(dataObject.source.name, this)) {
            removeFromMyArchives(dataObject.source.name, this);
        } else {
            addtoMyArchives(dataObject.source.name, this);
        }
    },
    
    'click .service-content-auto-archive i': function(e) {
        var dataObject = Template.currentData();
        if(addedToAutoArchives(dataObject.source.name, this)) {
            removeFromAutoArchives(dataObject.source.name, this);
        } else {
            addtoAutoArchives(dataObject.source.name, this);
        }
    }
});