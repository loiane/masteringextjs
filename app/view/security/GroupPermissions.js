Ext.define('Packt.view.security.GroupPermissions', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.grouppermissions',

    requires: ['Packt.store.security.Permissions'],

    title: 'Group Permissions',
    rootVisible: false,
    useArrows: true,
    frame: false,
    viewConfig: {
	    markDirty: false
	},

    store: Ext.create('Packt.store.security.Permissions')

});