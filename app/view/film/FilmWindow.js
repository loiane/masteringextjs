Ext.define('Packt.view.film.FilmWindow', {
    extend: 'Ext.window.Window',
    xtype: 'film-window',

    requires: [
        'Packt.util.Util',
        'Packt.util.Glyphs',
        'Packt.view.film.FilmFormContainer',
        'Packt.view.film.FilmActorsGrid',
        'Packt.view.film.FilmFormCategories'
    ],

    width: 537,
    height: 400,
    iconCls: 'film_add',
    autoScroll: true,

    bind: {
        title: '{title}'
    },

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
                    xtype: 'film-form-container'
                },{
                    xtype: 'film-categories-form'
                },{
                    xtype: 'film-actors',
                    dockedItems: [{
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Search and Add',
                                glyph: Packt.util.Glyphs.getGlyph('searchAndAdd')
                            },
                            {
                                xtype: 'button',
                                text: 'Delete',
                                glyph: Packt.util.Glyphs.getGlyph('destroy')
                            }
                        ]
                    }]
                }]
            }]
        }
    ]
});