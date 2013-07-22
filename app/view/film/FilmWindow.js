Ext.define('Packt.view.film.FilmWindow', {
    extend: 'Packt.view.sakila.WindowForm',
    alias: 'widget.filmwindow',

    requires: [
        'Packt.view.film.FilmCategories',
        'Packt.view.film.FilmActors',
        'Packt.util.Util'
    ],

    width: 537,
    title: 'Edit Film',
    iconCls: 'film_add',

    items: [
        { 
            xtype: 'form',
            itemId: 'filmForm',
            autoScroll: true,
            layout: {
                type: 'fit'
            },
            items: [
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            autoScroll: true,
                            bodyPadding: 10,
                            layout: {
                                type: 'anchor'
                            },
                            title: 'Film Information',
                            defaults: {
                                anchor: '100%',
                                msgTarget: 'side'
                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'film_id'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'title',
                                    fieldLabel: 'Title',
                                    afterLabelTextTpl: Packt.util.Util.required,
                                    allowBlank: false,
                                    maxLength: 255
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'release_year',
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
                                    afterLabelTextTpl: Packt.util.Util.required,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'rental_rate',
                                    fieldLabel: 'Rental Rate',
                                    maxValue: 5,
                                    minValue: 0,
                                    step: 0.1,
                                    afterLabelTextTpl: Packt.util.Util.required,
                                    allowBlank: false
                                },
                                // {
                                //     xtype: 'textfield',
                                //     name: 'length',
                                //     fieldLabel: 'Lenght (min)'//,
                                //     // maxValue: 999,
                                //     // minValue: 1//,
                                //     // //allowDecimals: false
                                // },
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
                                    queryMode: 'local',
                                    store: 'film.Ratings'
                                },
                                {
                                    xtype: 'checkboxgroup',
                                    fieldLabel: 'Special Features',
                                    columns: 2,
                                    name: 'special_features',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            boxLabel: 'Trailers',
                                            inputValue: 'Trailers',
                                            name: 'trailers'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            boxLabel: 'Commentaries',
                                            inputValue: 'Commentaries',
                                            name: 'commentaries'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            boxLabel: 'Deleted Scenes',
                                            inputValue: 'Deleted Scenes',
                                            name: 'deleted'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            boxLabel: 'Behind the Scenes',
                                            inputValue: 'Behind the Scenes',
                                            name: 'behind'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textareafield',
                                    name: 'description',
                                    fieldLabel: 'Description',
                                    maxLength: 5000
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'Film Categories',
                            itemId: 'filmcategories',
                            layout: 'fit',
                            autoScroll: true,
                            items: [{
                                xtype: 'filmcategories'
                            }]
                        },
                        {
                            xtype: 'panel',
                            title: 'Film Actors',
                            layout: 'fit',
                            itemId: 'filmactors',
                            autoScroll: true,
                            items: [{
                                xtype: 'filmactors'
                            }]
                        }
                    ]
                }
            ]
        }
    ]
});