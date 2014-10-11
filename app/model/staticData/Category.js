Ext.define('Packt.model.staticData.Category', {
    extend: 'Packt.model.staticData.Base',

    idProperty: 'category_id',

    entityName: 'Category',

    fields: [
        { name: 'category_id' },
        { name: 'name', defaultValue: 'New Category*'}
    ]
});