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
            maxValue: (new Date().getFullYear()) + 1,
            minValue: 1950,
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
            maxValue: 10,
            minValue: 1,
            allowDecimals: false,
            afterLabelTextTpl: Packt.util.Util.required,
            bind : '{currentFilm.rental_duration}'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Rental Rate',
            maxValue: 5,
            minValue: 0,
            step: 0.1,
            afterLabelTextTpl: Packt.util.Util.required,
            bind : '{currentFilm.rental_rate}'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Length (min)',
            allowDecimals: false,
            bind : '{currentFilm.length}'
            // maxValue: 999,
            // minValue: 1//,

        },
        {
            xtype: 'numberfield',
            name: 'replacement_cost',
            fieldLabel: 'Replacement Cost',
            maxValue: 100,
            minValue: 0,
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
            displayField: 'state',
            valueField: 'abbr',
            filterPickList: true,
            queryMode: 'local',
            publishes: 'value',
            bind : '{currentFilm.special_features}'
        },
        {
            xtype: 'textareafield',
            fieldLabel: 'Description',
            bind : '{currentFilm.description}'
        }
    ]
});