Ext.define('Packt.view.menu.Tree', {
    extend: 'Ext.tree.Panel',
    xtype: 'menutree',

    requires: [
       'Packt.overrides.tree.ColumnOverride'
    ],

    border: 0,
    autoScroll: true,
    rootVisible: false
});