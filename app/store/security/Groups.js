Ext.define('Packt.store.security.Groups', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.model.security.Group'
    ],

    model: 'Packt.model.security.Group',

    storeId: 'groups',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'php/security/group.php',
        
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});