/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
function loadLocale(){

    var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en',
        //file = Ext.util.Format.format("resources/locale/{0}.js", lang),
        extJsFile = Ext.util.Format.format("ext/packages/ext-locale/build/ext-locale-{0}.js", lang);

    /*Ext.Loader.loadScript({url: file, onError: function(){
        alert('Error loading locale file. Please contact system administrator.');
    }});*/
    Ext.Loader.loadScript({url: extJsFile});
}

loadLocale();

Ext.require('Ext.layout.container.Fit');
Ext.require('Ext.form.Panel');
Ext.require('Ext.layout.container.Border');
Ext.require('Ext.layout.container.Center');
Ext.require('Ext.form.FieldSet');
Ext.require('Ext.form.field.Hidden');
Ext.require('Ext.form.field.File');
Ext.require('Ext.Img');
Ext.require('Ext.form.field.ComboBox');
Ext.require('Ext.layout.container.Accordion');
Ext.require('Ext.ux.LiveSearchGridPanel');
Ext.require('Ext.grid.column.Date');
Ext.require('Ext.grid.column.Widget');
Ext.require('Ext.form.field.Tag');

Ext.require('Packt.view.login.Login');
Ext.require('Packt.view.main.Main');
Ext.require('Packt.controller.Root');
Ext.require('Packt.view.menu.Tree');

Ext.require('Ext.data.validator.Exclusion');
Ext.require('Ext.data.validator.Format');
Ext.require('Ext.data.validator.Presence');
Ext.require('Ext.data.validator.Length');
Ext.require('Ext.data.validator.Email');

Ext.require('Ext.chart.series.Pie');
Ext.require('Ext.chart.interactions.Rotate');
Ext.require('Ext.chart.interactions.ItemHighlight');
Ext.require('Ext.chart.axis.Numeric');
Ext.require('Ext.chart.axis.Category');

Ext.define('Packt.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Packt',

    glyphFontFamily: 'FontAwesome',

    requires: [
        'Packt.overrides.tree.ColumnOverride',
        'Packt.overrides.grid.column.Action',

        'Packt.overrides.patch.data.ModelWithId' //ExtJS 5 bug fix - remove this once Sencha fixes it

        ,'Packt.view.film.Films'
        ,'Packt.view.base.Grid',
        'Packt.view.reports.SalesFilmCategory'
    ],

    enableQuickTips: true,

    views: [
    ],

    controllers: [
        //'Root',
        'Menu',
        'StaticData'
        ,'Test'      //TODO: remove this for complete app - this will skip the login page
    ],

    stores: [
    ],

    defaultToken : 'home',
    
    launch: function () {

//        var me = this;
//
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
//                        //console.log('launch');
//                        Ext.widget('login-dialog');
//                    }
//                }
//            });
//        });


        //task.delay(2000);

        Ext.widget('login-dialog');
    },

    init: function () {
//        var me = this;
//
//        // Start the mask on the body and get a reference to the mask
//        me.splashscreen = Ext.getBody().mask('Loading application', 'splashscreen');
//
//        // Add a new class to this mask as we want it to look different from the default.
//        me.splashscreen.addCls('splashscreen');
//
//        // Insert a new div before the loading icon where we can place our logo.
//        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
//            cls: 'x-splash-icon'
//        });
    }
});
