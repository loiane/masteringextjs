Ext.define('MasteringExtJS.view.main.Header', {
    extend: 'Ext.toolbar.Toolbar',

    requires: [
        'MasteringExtJS.view.locale.Locale',

        'Ext.toolbar.Spacer',
        'Ext.toolbar.TextItem',
        'Ext.Button'
    ],

    xtype: 'app-header',

    items: [
        {
            xtype: 'component',
            reference: 'senchaLogo',
            cls: 'sencha-logo',
            html: '<div class="main-logo">DVD Rental Store</div>',
            width: 250
        },
        {
            margin: '0 0 0 8',
            cls: 'delete-focus-bg',
            iconCls:'x-fa fa-navicon',
            id: 'main-navigation-btn',
            handler: 'onToggleNavigationSize'
        },
        {
            xtype: 'tbspacer',
            flex: 1
        },
        {
            xtype: 'tbtext',
            text: 'User Name',
            cls: 'top-user-name'
        },
        {
            xtype: 'locale'
        },
        {
            xtype: 'button',
            itemId: 'logout',
            text: 'Logout',
            reference: 'logout',
            iconCls: 'fa fa-sign-out fa-lg buttonIcon',
            listeners: {
                click: 'onLogout'
            }
        }
    ]
});