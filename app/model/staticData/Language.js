Ext.define('MasteringExtJS.model.staticData.Language', {
    extend: 'MasteringExtJS.model.staticData.Base',

    idProperty: 'language_id',

    entityName: 'Language',

    fields: [
        { name: 'language_id' },
        { name: 'name', defaultValue: 'New Language*'}
    ]
});