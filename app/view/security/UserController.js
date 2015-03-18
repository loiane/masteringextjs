Ext.define('Packt.view.security.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.user',

    requires: [
        'Packt.util.Util'
    ],

    onAdd: function(button, e, options){
        this.createDialog(null);
    },

    onEdit: function(button, e, options){

        var me = this,
            records = me.getRecordsSelected();

        if(records[0]){
            me.createDialog(records[0]);
        }
    },

    createDialog: function(record){

        var me = this,
            view = me.getView();

        console.log(record);

        me.dialog = view.add({
            xtype: 'user-form',
            viewModel: {
                data: {
                    title: record ? 'Edit: ' + record.get('name') : 'Add User'
                },
                links: {
                    currentUser: record || Ext.create('Packt.model.security.User')
                }
            }
        });

        me.dialog.show();
    },

    getRecordsSelected: function(){
        var grid = this.lookupReference('usersGrid');
        return grid.getSelection();
    },

    onDelete: function(button, e, options){

        var me = this,
            view = me.getView(),
            records = me.getRecordsSelected(),
            store = me.getStore('users');

        if (store.getCount() >= 2 && records.length){
            Ext.Msg.show({
                title:'Delete?',
                msg: 'Are you sure you want to delete?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (buttonId){
                    if (buttonId == 'yes'){
                        store.remove(records);
                        store.sync();
                    }
                }
            });
        } else if (store.getCount() === 1) {
            Ext.Msg.show({
                title:'Warning',
                msg: 'You cannot delete all the users from the application.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    onSave: function(button, e, options){

        var me = this,
            form = me.lookupReference('form');

        if (form.isValid()) {
            form.submit({
                clientValidation: true,
                url: 'php/user/save.php',
                scope: me,
                success: 'onSaveSuccess',
                failure: 'onSaveFailure'
            });
        }
    },

    onSaveSuccess: function(form, action) {
        var me = this;
        me.onCancel();
        me.refresh();
        Packt.util.Util.showToast('Success! User saved.');
    },

    onSaveFailure: function(form, action) {
        Packt.util.Util.handleFormFailure(action);
    },

    onCancel: function(button, e, options){
        var me = this;
        me.dialog = Ext.destroy(me.dialog);
    },

    refresh: function(button, e, options){
        var me = this,
            store = me.getStore('users');

        store.load();
    },

    onFileFieldChange: function(fileField, value, options) {

        var me = this,
            file = fileField.fileInputEl.dom.files[0],
            picture = this.lookupReference('userPicture');

        /*
         If the file is an image and the web browser supports FileReader,
         present a preview in the image component
         */
        if (typeof FileReader !== 'undefined' && (/image/i).test(file.type)) {
            var reader = new FileReader();
            reader.onload = function(e){
                picture.setSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        } else if (!(/image/i).test(file.type)){
            Ext.Msg.alert('Warning', 'You can only upload image files!');
            fileField.reset();
        }
    }
});
