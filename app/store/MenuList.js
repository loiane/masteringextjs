Ext.define('MasteringExtJS.store.MenuList', {
    extend: 'Ext.data.TreeStore',

    storeId: 'MenuList',

    fields: [
        {
            name: 'text'
        }
    ],

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'data/menu.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});