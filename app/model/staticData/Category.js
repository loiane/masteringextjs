Ext.define('MasteringExtJS.model.staticData.Category', {
    extend: 'MasteringExtJS.model.staticData.Base',

    idProperty: 'category_id',

    entityName: 'Category',

    fields: [
        { name: 'category_id' },
        { name: 'name', defaultValue: 'New Category*'}
    ],

    manyToMany: {
        CategoryFilms: {
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