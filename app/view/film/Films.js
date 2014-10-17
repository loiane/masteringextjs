Ext.define('Packt.view.film.Films', {
    extend: 'Ext.panel.Panel',
    xtype: 'films',

    requires: [
        'Packt.view.base.TopToolBar',
        'Packt.view.film.FilmsGrid',
        'Packt.view.film.FilmActorsGrid',
        'Packt.view.film.FilmCategoriesGrid',
        'Packt.view.film.FilmsModel',
        'Packt.view.film.FilmsController'
    ],

    controller: 'films',
    viewModel: {
        type: 'films'
    },

    session: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'films-grid',
        flex: 1
    },{
        xtype: 'container',
        split: true,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        height: 150,
        items: [{
            xtype: 'film-categories',
            flex: 1
        },{
            xtype: 'film-actors',
            flex: 2
        }]
    }],

    dockedItems: [{
        xtype: 'top-tool-bar'
    }]
});