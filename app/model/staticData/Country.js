Ext.define('MasteringExtJS.model.staticData.Country', {
    extend: 'MasteringExtJS.model.staticData.Base',

    idProperty: 'country_id',

    entityName: 'Country',

    fields: [
        { name: 'country_id' },
        { name: 'country', defaultValue: 'New Country*'}
    ]
});