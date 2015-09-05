Ext.define('MasteringExtJS.view.menu.MenuList', {
    extend: 'Ext.list.Tree',

    requires: [
        'MasteringExtJS.view.menu.MenuListController',
        'MasteringExtJS.store.MenuList'
    ],

    xtype: 'mainmenu',

    controller: 'mainmenu',
    viewModel: {
        type: 'mainmenu'
    },

    reference: 'mainMenu',
    itemId: 'mainMenu',

    //bind: '{menuList}',

    ui: 'navigation',
    store: 'MenuList',
    width: 250,
    expanderFirst: false,
    expanderOnly: false,
    listeners: {
        //selectionchange: 'onNavigationTreeSelectionChange'
    }
});