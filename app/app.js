/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        //Ext: '.',
        'Ext.ux': 'ux'
        //'Packt.util': 'app/util'
    }
});

Ext.application({
    name: 'Packt',

    requires: [
        'Ext.menu.Menu',
        'Ext.form.Panel',
        'Ext.layout.container.Accordion',
        'Ext.form.Label',
        'Packt.store.security.Permissions',
        'Packt.store.security.Users',
        'Packt.util.Util',
        'Ext.data.proxy.Ajax',
        'Ext.form.FieldSet',
        'Ext.form.field.Hidden',
        'Ext.form.field.ComboBox',
        'Ext.form.field.File',
        'Ext.grid.plugin.CellEditing',
        'Ext.ux.grid.FiltersFeature',
        'Ext.grid.column.Date',
        'Ext.grid.column.Action',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Column',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Packt.view.film.FilmWindow',
        'Ext.form.CheckboxGroup',
        'Packt.view.film.SearchCategory',
        'Packt.view.film.SearchActor'
    ],

    views: [
        'Main',
        'Viewport'
    ],

    stores: [
        'security.Permissions'
    ],

    controllers: [
        'Main',
        'Login',
        'TranslationManager',
        'Menu',
        'security.Groups',
        'security.Users',
        'staticData.AbstractController',
        'cms.Films',
        'Abstract',
        'reports.SalesFilmCategory',
        'mail.Mail'
    ],

    splashscreen: {},


    //autoCreateViewport: true,

    init: function() {

        // Start the mask on the body and get a reference to the mask
         splashscreen = Ext.getBody().mask('Loading application', 'splashscreen');

        // Add a new class to this mask as we want it to look different from the default.
         splashscreen.addCls('splashscreen');

        // Insert a new div before the loading icon where we can place our logo.
        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
            cls: 'x-splash-icon'
        });

        //console.log('init');
    },

    launch: function() {

        Ext.tip.QuickTipManager.init();

        var task = new Ext.util.DelayedTask(function() {

            //Fade out the body mask
            splashscreen.fadeOut({
                duration: 1000,
                remove:true
            });

            //Fade out the icon and message
            splashscreen.next().fadeOut({
                duration: 1000,
                remove:true,
                listeners: {
                    afteranimate: function(el, startTime, eOpts ){
                        Ext.widget('login');
                    }
                }
            });

           // Ext.widget('mainviewport');
           //Ext.widget('login');

            //console.log('launch');
       });

       task.delay(2000);

    }
});
