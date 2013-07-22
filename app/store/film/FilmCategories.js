Ext.define('Packt.store.film.FilmCategories', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.model.staticData.Category',
        'Packt.proxy.Sakila'
    ],

    model: 'Packt.model.staticData.Category',

    proxy: {
        type: 'sakila',

        api: {
            create: 'php/inventory/film_category_create.php',
            read: 'php/inventory/film_category.php',
            update: 'php/inventory/film_category_update.php',
            destroy: 'php/inventory/film_category_destroy.php'
        }
    }
});