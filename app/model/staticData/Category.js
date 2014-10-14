Ext.define('Packt.model.staticData.Category', {
    extend: 'Packt.model.staticData.Base',

    idProperty: 'category_id',

    entityName: 'Category',

    fields: [
        { name: 'category_id' },
        { name: 'name', defaultValue: 'New Category*'}
    ],

    manyToMany: {
        Films: {
            type: 'Film',
            role: 'films',
            field: 'film_id',
            right: {
                field: 'category_id',
                role: 'categories'
            }
        }
    }
});