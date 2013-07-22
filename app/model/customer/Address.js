Ext.define('Packt.model.customer.Address', {
    extend: 'Packt.model.sakila.Sakila',

    idProperty: 'address_id',

    fields: [
        { name: 'address_id' },
        { name: 'address'},
        { name: 'address2'},
        { name: 'district'},
        { name: 'city_id'},
        { name: 'phone'}
    ]	
});