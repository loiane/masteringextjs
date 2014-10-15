Ext.define('Packt.view.film.FilmFormContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'film-form-container',

    requires: [
        'Packt.util.Util',
        'Packt.util.Glyphs'
    ],

    bodyPadding: 10,
    layout: {
        type: 'anchor'
    },
    title: 'Film Information',
    defaults: {
        anchor: '100%',
        msgTarget: 'side',
        labelWidth: 105
    },

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Title',
            afterLabelTextTpl: Packt.util.Util.required,
            bind : '{currentFilm.title}'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Release Year',
            allowDecimals: false,
            bind : '{currentFilm.release_year}'
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Language',
            displayField: 'name',
            valueField: 'language_id',
            queryMode: 'local',
            store: 'staticData.Languages',
            afterLabelTextTpl: Packt.util.Util.required,
            bind : '{currentFilm.language_id}'
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Original Language',
            displayField: 'name',
            valueField: 'language_id',
            queryMode: 'local',
            store: 'staticData.Languages',
            bind : '{currentFilm.original_language_id}'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Rental Duration',
            allowDecimals: false,
            afterLabelTextTpl: Packt.util.Util.required,
            bind : '{currentFilm.rental_duration}'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Rental Rate',
            step: 0.1,
            afterLabelTextTpl: Packt.util.Util.required,
            bind : '{currentFilm.rental_rate}'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Length (min)',
            allowDecimals: false,
            bind : '{currentFilm.length}'

        },
        {
            xtype: 'numberfield',
            name: 'replacement_cost',
            fieldLabel: 'Replacement Cost',
            step: 0.1,
            afterLabelTextTpl: Packt.util.Util.required,
            bind : '{currentFilm.replacement_cost}'
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Rating',
            displayField: 'text',
            valueField: 'text',
            queryMode: 'local',
            bind: {
                value: '{currentFilm.rating}',
                store: '{ratings}'
            }
        },
        {
            xtype: 'tagfield',
            fieldLabel: 'Special Features',
            displayField: 'text',
            valueField: 'text',
            filterPickList: true,
            queryMode: 'local',
            publishes: 'value',
            stacked: true,
            bind: {
                value: '{specialFeatures}',
                store: '{special_features}'
            }
        },
        {
            xtype: 'textareafield',
            fieldLabel: 'Description',
            bind : '{currentFilm.description}'
        }
    ]
});