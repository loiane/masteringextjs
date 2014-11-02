Ext.define('Packt.view.main.Header', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'appheader',

    requires: [
        'Packt.view.locale.Translation',
        'Packt.view.main.ResponsiveMenuButton'
    ],

    ui: 'footer',

    items: [{
            xtype: 'component',
            bind: {
                html: '{appHeaderIcon}'
            }
        },{
            xtype: 'component',
            componentCls: 'app-header-title',
            bind: {
                html: '{appName}'
            }
        },{
            xtype: 'tbfill'
        },{
            xtype: 'responsive-mainmenu'
        },{
            xtype: 'translation'
        },{
            xtype: 'tbseparator'
        },{
            xtype: 'button',
            itemId: 'logout',
            text: translations.logout,
            reference: 'logout',
            iconCls: 'fa fa-sign-out fa-lg buttonIcon',
            listeners: {
                click: 'onLogout'
            }
        }
    ]
});