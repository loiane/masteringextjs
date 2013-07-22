Ext.define('Packt.store.film.FilmInventories', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.model.film.FilmInventory',
        'Packt.proxy.Sakila'
    ],

    model: 'Packt.model.film.FilmInventory',

    proxy: {
        type: 'sakila',
        url: 'php/inventory/film_inventory.php',
        
        api: {
            create: 'php/inventory/film_category_create.php',
            read: 'php/inventory/film_category.php',
            update: 'php/inventory/film_category_update.php',
            destroy: 'php/inventory/film_category_destroy.php'
        }
    }
});