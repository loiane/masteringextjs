Ext.define('Packt.view.film.FilmActors', {
    extend: 'Packt.view.sakila.SakilaGrid',
    alias: 'widget.filmactors',

    requires: [
        'Packt.view.toolbar.SearchAddDelete'
    ],

    store: 'film.FilmActors',

    columns: [
        {
            text: 'Actor Id',
            width: 100,
            dataIndex: 'actor_id'
        },
        {
            text: 'First Name',
            flex: 1,
            dataIndex: 'first_name'
        },
        {
            text: 'Last Name', 
            width: 200,
            dataIndex: 'last_name'
        }
    ],

    dockedItems: [
        {
            xtype: 'searchadddelete'
        }
    ]
});