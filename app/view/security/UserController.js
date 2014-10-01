Ext.define('Packt.view.security.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.user',

    requires: [
        'Packt.util.Util'
    ],

    onAdd: function(button, e, options){

        var win = Ext.create('Packt.view.security.UserForm').show();

    },

    onEdit: function(button, e, options){

        var win = Ext.create('Packt.view.security.UserForm');
        win.setViewModel(this.getView().getViewModel());
        //this.lookupReference('userForm').show();
        win.show();
    },

    onDelete: function(button, e, options){


    }
});
