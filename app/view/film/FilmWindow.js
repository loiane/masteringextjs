Ext.define('Packt.view.film.FilmWindow', {
    extend: 'Packt.view.base.WindowForm',
    xtype: 'film-window',

    requires: [
        'Packt.view.film.FilmFormContainer',
        'Packt.view.film.FilmActorsGrid',
        'Packt.view.film.FilmFormCategories'
    ],

    width: 537,

    items: [
        {
            xtype: 'form',
            reference: 'filmForm',
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'tabpanel',
                activeTab: 0,
                items: [{
                    xtype: 'film-form-container',
                    glyph: Packt.util.Glyphs.getGlyph('film')
                },{
                    xtype: 'film-categories-form',
                    glyph: Packt.util.Glyphs.getGlyph('category')
                },{
                    xtype: 'film-actors',
                    reference: 'actorsGrid',
                    dockedItems: [{
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Search and Add',
                                glyph: Packt.util.Glyphs.getGlyph('searchAndAdd'),
                                listeners: {
                                    click: 'onAddActor'
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Delete',
                                glyph: Packt.util.Glyphs.getGlyph('destroy'),
                                listeners: {
                                    click: 'onDeleteActor'
                                }
                            }
                        ]
                    }]
                }]
            }]
        }
    ]
});