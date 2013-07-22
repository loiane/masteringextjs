Ext.define('Packt.view.staticData.Languages', {
    extend: 'Packt.view.staticData.AbstractGrid',
    alias: 'widget.languagesgrid',

    store: 'staticData.Languages',

    columns: [
        {
            text: 'Language Id',
            width: 100,
            dataIndex: 'language_id',
            filter: {
                type: 'numeric'
            }
        },
        {
            text: 'Language Name',
            flex: 1,
            dataIndex: 'name',
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