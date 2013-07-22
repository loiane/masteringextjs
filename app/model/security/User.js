Ext.define('Packt.model.security.User', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'userName' },
        { name: 'email' },
        { name: 'picture' },
        { name: 'Group_id' }
    ]
});