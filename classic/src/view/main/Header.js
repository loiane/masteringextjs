Ext.define('MasteringExtJS.view.main.Header', {
    extend: 'Ext.toolbar.Toolbar',

    requires: [
        'MasteringExtJS.view.locale.Locale',

        'Ext.toolbar.Spacer',
        'Ext.toolbar.TextItem',
        'Ext.Button'
    ],

    xtype: 'app-header',

    initComponent: function() {

        var me = this;

        me.items = [
            {
                xtype: 'component',
                reference: 'senchaLogo',
                cls: 'sencha-logo',
                html: '<div class="main-logo">'+_('appName')+'</div>',
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
                text: _('logout'),
                reference: 'logout',
                iconCls: 'fa fa-sign-out fa-lg buttonIcon',
                listeners: {
                    click: 'onLogout'
                }
            }
        ];

        me.callParent(arguments);
    }
});