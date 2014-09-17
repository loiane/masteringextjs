/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Packt.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Packt',

    enableQuickTips: true,

    views: [
        // TODO: add views here
        'login.Login'
    ],

    controllers: [
        'Root'
        // TODO: add controllers here
    ],

    stores: [
        // TODO: add stores here
    ],
    
    launch: function () {

        var me = this;

//        var task = new Ext.util.DelayedTask(function() {
//
//            //Fade out the body mask
//            me.splashscreen.fadeOut({
//                duration: 1000,
//                remove:true
//            });
//
//            //Fade out the icon and message
//            me.splashscreen.next().fadeOut({
//                duration: 1000,
//                remove:true,
//                listeners: {
//                    afteranimate: function(el, startTime, eOpts ){
//                        console.log('launch');
//                        Ext.widget('login');
//                    }
//                }
//            });
//        });

        Ext.widget('app-main');

        //task.delay(2000);
    },

    init: function () {
        var me = this;

        // Start the mask on the body and get a reference to the mask
        //me.splashscreen = Ext.getBody().mask('Loading application', 'splashscreen');

        // Add a new class to this mask as we want it to look different from the default.
        //me.splashscreen.addCls('splashscreen');

        // Insert a new div before the loading icon where we can place our logo.
//        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
//            cls: 'x-splash-icon'
//        });
    }
});
