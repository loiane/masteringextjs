Ext.define('Packt.model.staticData.Country', {
    extend: 'Packt.model.staticData.Base',

    idProperty: 'country_id',

    entityName: 'Country',

    fields: [
        { name: 'country_id' },
        { name: 'country', defaultValue: 'New Country*'}
    ]
});