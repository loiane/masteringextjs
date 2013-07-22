Ext.define('Packt.view.staticData.Countries', {
    extend: 'Packt.view.staticData.AbstractGrid',
    alias: 'widget.countriesgrid',

    store: 'staticData.Countries',

    columns: [
        {
            text: 'Country Id',
            width: 100,
            dataIndex: 'country_id',
            filter: {
                type: 'numeric'
            }
        },
        {
            text: 'Country Name',
            flex: 1,
            dataIndex: 'country',
            editor: {
                allowBlank: false,
                maxLength: 45
            },
            filter: {
                type: 'string'
            }
        }
    ]
});