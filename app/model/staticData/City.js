Ext.define('MasteringExtJS.model.staticData.City', {
    extend: 'MasteringExtJS.model.staticData.Base',

    idProperty: 'city_id',

    entityName: 'City',

    fields: [
        { name: 'city_id' },
        { name: 'city' , defaultValue: 'New City*'},
        { name: 'country_id' }
    ]
});