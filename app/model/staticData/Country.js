Ext.define('Packt.model.staticData.Country', {
    extend: 'Packt.model.sakila.Sakila',

    idProperty: 'country_id',

    fields: [
        { name: 'country_id' },
        { name: 'country', defaultValue: 'New Country*'}
    ]
});