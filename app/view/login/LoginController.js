Ext.define('Packt.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    requires: [
        'Packt.view.login.CapsLockTooltip',
        'Packt.util.Util',
        'Packt.util.SessionMonitor'
    ],

   onTextFieldSpecialKey: function(field, e, options){
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    onTextFieldKeyPress: function(field, e, options){

        var charCode = e.getCharCode(),
            me = this;

        if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
            (!e.shiftKey && charCode >= 65 && charCode <= 90)){

            if(me.capslockTooltip === undefined){
                me.capslockTooltip = Ext.widget('capslocktooltip');
            }

            me.capslockTooltip.show();

        } else {

            if(me.capslockTooltip !== undefined){
                me.capslockTooltip.hide();
            }
        }
    },

    onButtonClickCancel: function(button, e, options){
        this.lookupReference('form').reset();
    },

    onButtonClickSubmit: function(button, e, options){

        var me = this;

        if (me.lookupReference('form').isValid()){
            me.doLogin();
        }
    },

    doLogin: function() {

        var me = this,
            form = me.lookupReference('form');

        Ext.getBody().mask('Authenticating... Please wait...');

        form.submit({
            clientValidation: true,
            url: 'php/security/login.php',
            scope: me,
            success: 'onLoginSuccess',
            failure: 'onLoginFailure'
        });
    },

    onLoginFailure: function(form, action) {

        Ext.getBody().unmask();

        var result = Packt.util.Util.decodeJSON(action.response.responseText);

        switch (action.failureType) {
            case Ext.form.action.Action.CLIENT_INVALID:
                Packt.util.Util.showErrorMsg('Form fields may not be submitted with invalid values');
                break;
            case Ext.form.action.Action.CONNECT_FAILURE:
                Packt.util.Util.showErrorMsg(action.response.responseText);
                break;
            case Ext.form.action.Action.SERVER_INVALID:
                if (result.msg) {
                    Packt.util.Util.showErrorMsg(result.msg);
                } else {
                    Packt.util.Util.showErrorMsg(action.response.responseText);
                }
        }
    },

    onLoginSuccess: function(form, action) {
        Ext.getBody().unmask();
        this.getView().close();
        Ext.create('Packt.view.main.Main');
        Packt.util.SessionMonitor.start();
    }
});