Ext.define('Packt.view.film.FilmActorsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'film-actors',

    requires: [
        'Packt.util.Glyphs'
    ],

    bind : '{filmsGrid.selection.actors}',
    border: true,

    title: 'Film Actors',
    glyph: Packt.util.Glyphs.getGlyph('actor'),

    columns: [
        {
            text: 'Actor Id',
            width: 80,
            dataIndex: 'actor_id'
        },
        {
            xtype: 'templatecolumn',
            text: 'Actor Name',
            flex: 1,
            tpl: '{first_name} {last_name}'
        }
    ]
});