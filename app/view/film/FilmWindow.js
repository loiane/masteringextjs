Ext.define('Packt.view.film.FilmWindow', {
    extend: 'Ext.window.Window',
    xtype: 'film-window',

    requires: [
        'Packt.util.Util',
        'Packt.util.Glyphs'
    ],

    width: 537,
    height: 400,
    title: 'Edit Film',
    iconCls: 'film_add',
    autoScroll: true,

    items: [
        {
            xtype: 'form',
            reference: 'filmForm',
            //autoScroll: true,
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'tabpanel',
                activeTab: 0,
                //autoScroll: true,
                items: [{
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
                            afterLabelTextTpl: Packt.util.Util.required
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Release Year',
                            maxValue: (new Date().getFullYear()) + 1,
                            minValue: 1950,
                            allowDecimals: false
                        },
                        {
                            xtype: 'combobox',
                            name: 'language_id',
                            fieldLabel: 'Language',
                            displayField: 'name',
                            valueField: 'language_id',
                            queryMode: 'local',
                            store: 'staticData.Languages',
                            afterLabelTextTpl: Packt.util.Util.required,
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            name: 'original_language_id',
                            fieldLabel: 'Original Language',
                            displayField: 'name',
                            valueField: 'language_id',
                            queryMode: 'local',
                            store: 'staticData.Languages'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'rental_duration',
                            fieldLabel: 'Rental Duration',
                            maxValue: 10,
                            minValue: 1,
                            allowDecimals: false,
                            afterLabelTextTpl: Packt.util.Util.required
                        },
                        {
                            xtype: 'numberfield',
                            name: 'rental_rate',
                            fieldLabel: 'Rental Rate',
                            maxValue: 5,
                            minValue: 0,
                            step: 0.1,
                            afterLabelTextTpl: Packt.util.Util.required
                        },
                        {
                             xtype: 'textfield',
                             name: 'length',
                             fieldLabel: 'Length (min)'//,
                             // maxValue: 999,
                             // minValue: 1//,
                             // //allowDecimals: false
                        },
                        {
                            xtype: 'numberfield',
                            name: 'replacement_cost',
                            fieldLabel: 'Replacement Cost',
                            maxValue: 100,
                            minValue: 0,
                            step: 0.1,
                            afterLabelTextTpl: Packt.util.Util.required
                        },
                        {
                            xtype: 'combobox',
                            name: 'rating',
                            fieldLabel: 'Rating',
                            displayField: 'text',
                            valueField: 'text',
                            queryMode: 'local'//,
                            //store: 'film.Ratings'
                        },
                        {
                            xtype: 'tagfield',
                            fieldLabel: 'Select a state',
                            /*store: {
                                type: 'states'
                            },*/
                            reference: 'states',
                            displayField: 'state',
                            valueField: 'abbr',
                            filterPickList: true,
                            queryMode: 'local',
                            publishes: 'value'
                        },
                        {
                            xtype: 'textareafield',
                            name: 'description',
                            fieldLabel: 'Description',
                            maxLength: 5000
                        }
                    ]
                }]
            }]
        }
    ]
});