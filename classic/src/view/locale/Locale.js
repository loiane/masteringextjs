/**
 * Created by loiane on 7/15/15.
 */
Ext.define('MasteringExtJS.view.locale.Locale', {
    extend: 'Ext.button.Split',

    requires: [
        'MasteringExtJS.view.locale.LocaleModel',
		'MasteringExtJS.view.locale.LocaleController',

        'Ext.menu.Menu',
        'Ext.menu.Item'
    ],

    xtype: 'locale',

    viewModel: {
        type: 'locale'
    },

    controller: 'locale',

    menu: {
        xtype: 'menu',
        defaults:{
            listeners: {
                click: 'onMenuItemClick'
            }
        },
        items: [
            {
                xtype: 'menuitem',
                iconCls: 'en',
                text: 'English'
            },
            {
                xtype: 'menuitem',
                iconCls: 'es',
                text: 'Español'
            },
            {
                xtype: 'menuitem',
                iconCls: 'pt_BR',
                text: 'Português'
            }
        ]
    }
});