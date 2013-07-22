Ext.define('Packt.controller.security.Users', {
    extend: 'Ext.app.Controller',

    requires: [
        'Packt.util.Util'
    ],

    views: [
        'security.Users',
        'security.Profile'
    ],

    stores: [
        'security.Groups'
    ],

    refs: [
        {
            ref: 'usersList',
            selector: 'userslist'
        },
        {
            ref: 'userPicture',
            selector: 'profile image'
        }
    ],

    init: function(application) {

        this.control({
            "userslist": {
                render: this.onRender
            },
            "users button#add": {
                click: this.onButtonClickAdd
            },
            "users button#edit": {
                click: this.onButtonClickEdit
            },
            "users button#delete": {
                click: this.onButtonClickDelete
            },
            "profile button#save": {
                click: this.onButtonClickSave
            },
            "profile button#cancel": {
                click: this.onButtonClickCancel
            },
            "profile filefield": {
                change: this.onFilefieldChange
            }
        });

        if (!Ext.getStore('groups')) {
            Ext.create('Packt.store.security.Groups');
        }    
    },

    onRender: function(component, options) {

        component.getStore().load();
    },

    onButtonClickAdd: function (button, e, options) {

        var win = Ext.create('Packt.view.security.Profile');
        win.setTitle('Add new User');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {

        var grid = this.getUsersList(),
        record = grid.getSelectionModel().getSelection();

        if(record[0]){

            var editWindow = Ext.create('Packt.view.security.Profile');

            editWindow.down('form').loadRecord(record[0]);

            if (record[0].get('picture')) {

                var img = editWindow.down('image');
                img.setSrc('resources/profileImages/' + record[0].get('picture'));
            }

            editWindow.setTitle(record[0].get('name'));
            editWindow.show();
        }
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getUsersList(),
        record = grid.getSelectionModel().getSelection(), 
        store = grid.getStore();

        if (store.getCount() >= 2 && record[0]){

            Ext.Msg.show({
                 title:'Delete?',
                 msg: 'Are you sure you want to delete?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        Ext.Ajax.request({
                            url: 'php/security/deleteUser.php',
                            params: {
                                id: record[0].get('id')
                            },
                            success: function(conn, response, options, eOpts) {

                                var result = Packt.util.Util.decodeJSON(conn.responseText);

                                if (result.success) {

                                    Packt.util.Alert.msg('Success!', 'User deleted.');
                                    store.load();
                                  
                                } else {
                                    Packt.util.Util.showErrorMsg(conn.responseText);
                                }
                            },
                            failure: function(conn, response, options, eOpts) {

                                Packt.util.Util.showErrorMsg(conn.responseText);
                            }
                        });
                    }
                 }
            });
        } else if (store.getCount() == 1) {
            Ext.Msg.show({
                title:'Warning',
                msg: 'You cannot delete all the users from the application.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    onButtonClickSave: function(button, e, options) {
        
        var win = button.up('window'),
        formPanel = win.down('form'),
        store = this.getUsersList().getStore();

        if (formPanel.getForm().isValid()) {

            formPanel.getForm().submit({
                clientValidation: true,
                url: 'php/security/saveUser.php',
                success: function(form, action) {

                    var result = action.result;

                    console.log(result);

                    if (result.success) {

                        Packt.util.Alert.msg('Success!', 'User saved.');
                        store.load();
                        win.close();
                      
                    } else {
                        Packt.util.Util.showErrorMsg(result.msg);
                    }
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.msg);
                   }
                }
            });
        } 
    },

    onButtonClickCancel: function(button, e, options) {
        button.up('window').close();
    },

    onFilefieldChange: function(filefield, value, options) {
        var file = filefield.fileInputEl.dom.files[0];

        var picture = this.getUserPicture();

        /*
            If the file is an image and the web browser supports FileReader, 
            present a preview in the image component 
        */
        if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
            var reader = new FileReader();
            reader.onload = function(e){
                picture.setSrc(e.target.result);
            };
            reader.readAsDataURL(file); 
        } else if (!(/image/i).test(file.type)){
            Ext.Msg.alert('Warning', 'You can only upload image files!');
            filefield.reset();
        }   
    }
});