Ext.define('Packt.model.film.FilmCategory', {
    extend: 'Packt.model.sakila.Sakila',

    idProperty: 'category_id',

    fields: [
        { name: 'film_id' },
        { name: 'category_id'}
    ]
});