Ext.define('Packt.model.staticData.Category', {
    extend: 'Packt.model.sakila.Sakila',

    idProperty: 'category_id',

    fields: [
        { name: 'category_id' },
        { name: 'name', defaultValue: 'New Category*'}
    ]
});