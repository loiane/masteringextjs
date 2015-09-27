Ext.define('MasteringExtJS.view.locale.Locale', {
    extend: 'Ext.button.Split',

    requires: [
		'MasteringExtJS.view.locale.LocaleController',

        'Ext.menu.Menu',
        'Ext.menu.Item'
    ],

    xtype: 'locale',

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