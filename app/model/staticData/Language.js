Ext.define('Packt.model.staticData.Language', {
    extend: 'Packt.model.staticData.Base',

    idProperty: 'language_id',

    entityName: 'Language',

    fields: [
        { name: 'language_id' },
        { name: 'name', defaultValue: 'New Language*'}
    ]
});