Ext.define('Packt.view.film.Films', {
    extend: 'Packt.view.sakila.SakilaGrid',
    alias: 'widget.filmsgrid',

    requires: [
        'Ext.grid.plugin.RowExpander',
        'Packt.view.sakila.SakilaGrid'
    ],

    store: 'film.Films',

    columns: [
        {
            text: 'Film Id',
            width: 100,
            dataIndex: 'film_id'
        },
        {
            text: 'Title',
            flex: 1,
            dataIndex: 'title'
        },
        {
            text: 'Language', 
            width: 100,
            dataIndex: 'language_id',
            renderer: function(value, metaData, record ){
                var languagesStore = Ext.getStore('languages');
                var lang = languagesStore.findRecord('language_id', value);
                return lang != null ? lang.get('name') : value;
            }
        },
        {
            text: 'Release Year',
            width: 90,
            dataIndex: 'release_year'
        },
        {
            text: 'Lenght',
            width: 80,
            dataIndex: 'length'
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
            store: 'film.Films',
            displayInfo: true,
            displayMsg: 'Displaying films {0} - {1} of {2}',
            emptyMsg: "No films to display"
        },
        {
            xtype: 'addeditdelete'
        }
    ],

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : [
            '<p><b>Description:</b> {description}</p><br>',
            '<p><b>Special Features:</b> {special_features}</p><br>',
            '<p><b>Rental Duration:</b> {rental_duration}</p><br>',
            '<p><b>Rental Rate:</b> {rental_rate}</p><br>',
            '<p><b>Replacement Cost:</b> {replacement_cost}</p><br>'
        ]
    }]
});