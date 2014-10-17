Ext.define('Packt.view.film.FilmSearchActor', {
    extend: 'Ext.window.Window',
    xtype: 'search-actor',

    requires: [
        'Packt.store.film.SearchActors'
    ],

    width: 600,
    bodyPadding: 10,
    layout: {
        type: 'anchor'
    },
    title: 'Search and Add Actor',
    autoShow: true,
    closable: false,
    glyph: Packt.util.Glyphs.getGlyph('searchAndAdd'),
    reference: 'search-actor',

    items: [
        {
            xtype: 'combo',
            reference: 'comboActors',
            displayField: 'first_name',
            valueField: 'actor_id',
            typeAhead: false,
            hideLabel: true,
            hideTrigger:true,
            anchor: '100%',
            minChars: 2,
            store: {
                type: 'search-actors'
            },

            displayTpl: new Ext.XTemplate(
                    '<tpl for=".">' +
                    '{[typeof values === "string" ? values : values["last_name"]]}, ' +
                    '{[typeof values === "string" ? values : values["first_name"]]}' +
                    '</tpl>'
            ),

            listConfig: {
                loadingText: 'Searching...',
                emptyText: 'No matching posts found.',

                // Custom rendering template for each item
                getInnerTpl: function() {
                    return '<h3><span>{last_name}, {first_name}</span></h3></br>' +
                        '{film_info}';
                }
            },
            pageSize: 2
        }, {
            xtype: 'component',
            style: 'margin-top:10px',
            html: 'Live search requires a minimum of 2 characters.'
        }
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        layout: {
            pack: 'end',
            type: 'hbox'
        },
        items: [
            {
                xtype: 'button',
                text: 'Cancel',
                glyph: Packt.util.Glyphs.getGlyph('cancel'),
                listeners: {
                    click: 'onCancelActors'
                }
            },
            {
                xtype: 'button',
                text: 'Clear',
                glyph: Packt.util.Glyphs.getGlyph('clear'),
                listeners: {
                    click: 'onClearActors'
                }
            },
            {
                xtype: 'button',
                text: 'Add Selected',
                glyph: Packt.util.Glyphs.getGlyph('save'),
                listeners: {
                    click: 'onSaveActors'
                }
            }
        ]
    }]
});