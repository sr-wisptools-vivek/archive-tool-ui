Template.fileSelectWidgetServiceContentTable.helpers({
    faicon: function(type, filename) {
        return getFontAwesomeIcon(type, filename);
    },
    addedToMyArchives: function(service, fileObject) {
        return addedToMyArchives(service, fileObject);
    },
    addedToAutoArchives: function(service, fileObject) {
        return addedToAutoArchives(service, fileObject);
    },
    inCurrentFolder: function(service, path) {
        return Session.get("service"+service+"_navigationRoot") === path;
    },
    addFolderClass: function(type) {
        if (type=="folder") {
            return 'navigation-folder';
        }
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
    },
    
    'click .navigation-folder': function(e) {
        var dataObject = Template.currentData();
        var newNavigationRoot = this.path[this.path.length-1]=="/"?this.path+this.name:this.path+"/"+this.name;
        Session.set("service"+dataObject.source.name+"_navigationRoot", newNavigationRoot);
    },
    
    'click .navigation-parent-folder': function(e) {
        var currentFolder = Session.get("service"+this.source.name+"_navigationRoot");
        if (currentFolder && currentFolder != "/") {
            var newNavigationRoot = currentFolder.split('/').slice(0,-1).join('/');
            if (newNavigationRoot == "") {
                newNavigationRoot = "/";
            }
            Session.set("service"+this.source.name+"_navigationRoot", newNavigationRoot);
        }
    }
});