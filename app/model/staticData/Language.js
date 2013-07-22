Ext.define('Packt.model.staticData.Language', {
    extend: 'Packt.model.sakila.Sakila',

    idProperty: 'language_id',

    fields: [
        { name: 'language_id' },
        { name: 'name', defaultValue: 'New Language*'}
    ]
});