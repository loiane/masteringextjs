Ext.define('Packt.controller.Abstract', {
    extend: 'Ext.app.Controller',

    init: function(application) {
        this.control({
            "windowform button[itemId=cancel]": {
                click: this.onButtonClickCancel
            },
            "searchWindow button[itemId=cancel]": {
                click: this.onButtonClickCancel
            }
        });
    },

    onButtonClickCancel: function(button, e, options) {
       button.up('window').close();
    }

});
