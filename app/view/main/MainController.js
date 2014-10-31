/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 */
Ext.define('Packt.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'Packt.util.Util'
    ],

    init: function() {
        Packt.app.createController('Root');
    },

    onLogout: function(button, e, options){

        var me = this;
        Ext.Ajax.request({
            url: 'php/security/logout.php',
            scope: me,
            success: 'onLogoutSuccess',
            failure: 'onLogoutFailure'
        });
    },

    onLogoutSuccess: function(conn, response, options, eOpts){
        var result = Packt.util.Util.decodeJSON(conn.responseText);

        if (result.success) {

            this.getView().destroy();
            window.location.reload();
        } else {

            Packt.util.Util.showErrorMsg(result.msg);
        }
    },

    onLogoutFailure: function(conn, response, options, eOpts){
        Packt.util.Util.showErrorMsg(conn.responseText);
    }
});
