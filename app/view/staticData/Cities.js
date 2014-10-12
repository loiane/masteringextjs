Ext.define('Packt.view.staticData.Cities', {
    extend: 'Packt.view.staticData.BaseGrid',
    xtype: 'citiesgrid',

    store: 'staticData.Cities',

    features: [
        {
            ftype:'grouping',
            itemId: 'grouping',
            enableGroupingMenu: false,
            groupHeaderTpl:  Ext.create('Ext.XTemplate',
                '{columnName}: ',
                '{name:this.formatName}',
                {
                    formatName: function(name) {
                        var countriesStore = Ext.getStore('staticData.Countries');
                        var country = countriesStore.findRecord('country_id', name);
                        return country != null ? country.get('country') : name;
                    }
                }
            )
        }
    ],

    columns: [
        {
            text: 'City Id',
            width: 100,
            dataIndex: 'city_id',
            filter: {
                type: 'numeric'
            }
        },
        {
            text: 'City Name',
            flex: 1,
            dataIndex: 'city',
            editor: {
                allowBlank: false,
                maxLength: 45
            },
            filter: {
                type: 'string'
            }
        },
        {
            text: 'Country',
            width: 200,
            dataIndex: 'country_id',
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                displayField: 'country',
                valueField: 'country_id',
                queryMode: 'local',
                store: 'staticData.Countries'
            },
            renderer: function(value, metaData, record ){
                var countriesStore = Ext.getStore('staticData.Countries');
                var country = countriesStore.findRecord('country_id', value);
                return country != null ? country.get('country') : value;
            }
        }
    ]
});