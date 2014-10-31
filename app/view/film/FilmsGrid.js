Ext.define('Packt.view.film.FilmsGrid', {
    extend: 'Packt.view.base.Grid',
    xtype: 'films-grid',

    bind : '{films}',

    reference: 'filmsGrid',

    columns: [
        {
            text: 'Film Id',
            width: 80,
            dataIndex: 'film_id'
        },
        {
            text: 'Title',
            flex: 1,
            dataIndex: 'title',
            renderer: function(value, metaData, record ){
                metaData['tdAttr'] = 'data-qtip="' +
                    record.get('description') + '"';
                return value;
            }
        },
        {
            text: 'Language',
            width: 100,
            dataIndex: 'language_id',
            renderer: function(value, metaData, record ){
                var languagesStore = Ext.getStore('staticData.Languages');
                var lang = languagesStore.findRecord('language_id', value);
                return lang != null ? lang.get('name') : value;
            }
        },
        {
            text: 'Release Year',
            width: 110,
            dataIndex: 'release_year'
        },
        {
            text: 'Length',
            width: 100,
            dataIndex: 'length',
            renderer: function(value, metaData, record ){
                return value + ' min';
            }
        },
        {
            text: 'Rating',
            width: 70,
            dataIndex: 'rating'
        }
    ],

    dockedItems: [
        {
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            bind : {
                store: '{films}'
            },
            displayInfo: true,
            displayMsg: 'Displaying films {0} - {1} of {2}',
            emptyMsg: "No films to display"
        }
    ],

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: [
            '<b>Description:</b> {description}</br>',
            '<b>Special Features:</b> {special_features}</br>',
            '<b>Rental Duration:</b> {rental_duration}</br>',
            '<b>Rental Rate:</b> {rental_rate}</br>',
            '<b>Replacement Cost:</b> {replacement_cost}</br>'
        ]
    }],

    listeners: {
        itemclick: 'onItemClick',
        selectfilm: 'onFilmSelect'
    }
});