Ext.define('Packt.store.film.FilmActors', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.model.staticData.Actor',
        'Packt.proxy.Sakila'
    ],

    model: 'Packt.model.staticData.Actor',

    proxy: {
        type: 'sakila',

        api: {
            create: 'php/inventory/film_actor_create.php',
            read: 'php/inventory/film_actor.php',
            update: 'php/inventory/film_actor_create.php',
            destroy: 'php/inventory/film_actor_delete.php'
        }
    }
});