Ext.define('Packt.model.menu.Accordion', {
    extend: 'Ext.data.Model',

    requires: [
        'Packt.model.menu.TreeNode'
    ],

    fields: [
        { name: 'id', type: 'int'},
        { name: 'text' },
        { name: 'iconCls' }
    ],

    hasMany: {
        model: 'Packt.model.menu.TreeNode',
        foreignKey: 'parent_id',
        name: 'items'
    }
});