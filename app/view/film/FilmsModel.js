Ext.define('Packt.view.film.FilmsModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.films',

    stores: {
        films: {
            model: 'Packt.model.film.Film',
            pageSize: 15,
            autoLoad: true,
            session: true
        },
        categories: {
            type: 'categories',
            autoLoad: true,
            session: true
        },
        actors: {
            type: 'actors',
            autoLoad: true,
            session: true
        },
        ratings: {
            fields: [
                {name: 'text'}
            ],
            data : [ // ENUM('G','PG','PG-13','R','NC-17')
                ['G'],
                ['PG'],
                ['PG-13'],
                ['R'],
                ['NC-17']
            ]
        }
    }
});