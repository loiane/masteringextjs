Ext.define('MasteringExtJS.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'MasteringExtJS.view.main.MainController',
        'MasteringExtJS.view.main.MainModel',
        'MasteringExtJS.view.main.Header',
        'MasteringExtJS.view.menu.MenuList',

        'Ext.layout.container.Border',
        'Ext.Container'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'center',
        xtype: 'container'
    },{
        xtype: 'app-header',
        region: 'north'
    },{
        xtype: 'mainmenu',
        region: 'west'
    }]
});
