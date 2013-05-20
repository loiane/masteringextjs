Ext.define('Packt.model.menu.Root', {
    extend: 'Ext.data.Model',

    uses: [
        'Packt.model.menu.Item'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'text'
        },
        {
            name: 'iconCls'
        },
        {
            name: 'id'
        }
    ],

    hasMany: {
        model: 'Packt.model.menu.Item',
        foreignKey: 'parent_id',
        name: 'items'
    }
});