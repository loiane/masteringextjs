Ext.define('MasteringExtJS.view.menu.MenuListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainmenu',

    requires: [
        'MasteringExtJS.store.MenuList'
    ],

    stores: {
        menuList: {
            source: 'MenuList'
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});