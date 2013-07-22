Ext.define('Packt.model.customer.Customer', {
    extend: 'Packt.model.sakila.Sakila',

    idProperty: 'customer_id',

    fields: [
        { name: 'customer_id' },
        { name: 'store_id'},
        { name: 'first_name'},
        { name: 'last_name'},
        { name: 'email'},
        { name: 'address_id'},
        { name: 'active', type: 'boolean'},
        { name: 'create_date'}
    ],

    associations: [
        {
            type: 'hasOne',
            associationKey: 'address_id',
            model: 'Packt.model.customer.Address',
            primaryKey: 'address_id',
            getterName: 'address',
            foreignKey: 'address_id',
            setterName: 'address'
        }   
    ]
});