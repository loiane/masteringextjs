Ext.define('Packt.controller.Test', {
    extend: 'Ext.app.Controller',

    init: function(application) {
        this.control({
            "login-dialog": {
                show: this.automaticLogin
            }
        });
    },

    automaticLogin: function(view, eOpts){
        var btn = view.down('button#submit');
        btn.fireEvent('click',btn);
    }

});
