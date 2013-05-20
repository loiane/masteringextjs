Ext.define('Packt.model.menu.Item', {
    extend: 'Ext.data.Model',

    uses: [
        'Packt.model.menu.Root'
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
            name: 'className'
        },
        {
            name: 'id'
        },
        {
            name: 'parent_id'
        }
    ],

    belongsTo: {
        model: 'Packt.model.menu.Root',
        foreignKey: 'parent_id'
    }
});