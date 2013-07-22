Ext.define('Packt.store.security.Permissions', {
    extend: 'Ext.data.TreeStore',

    clearOnLoad: true,

    proxy: {
        type: 'ajax',
        url: 'php/security/permissions.php'
    }
});