Ext.define('Packt.model.film.Film', {
    extend: 'Packt.model.staticData.Base',

    entityName: 'Film',

    idProperty: 'film_id',

    fields: [
        { name: 'film_id' },
        { name: 'title'},
        { name: 'description'},
        { name: 'release_year', type: 'int'},
        { name: 'language_id'},
        { name: 'original_language_id'},
        { name: 'rental_duration', type: 'int'},
        { name: 'rental_rate', type: 'float'},
        { name: 'length', type: 'int'},
        { name: 'replacement_cost', type: 'float'},
        { name: 'rating'},
        { name: 'special_features'}
    ],

    manyToMany: {
        FilmCategories: {
            type: 'Category',
            role: 'categories',
            field: 'category_id',
            right: {
                field: 'film_id',
                role: 'films'
            }
        },
        FilmActors: {
            type: 'Actor',
            role: 'actors',
            field: 'actor_id',
            right: {
                field: 'film_id',
                role: 'films'
            }
        }
    }

});