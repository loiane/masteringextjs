Ext.define('MasteringExtJS.view.staticdata.Actors', {
    extend: 'MasteringExtJS.view.staticdata.BaseGrid',

    requires: [
        'MasteringExtJS.store.staticData.Actors'
    ],

    xtype: 'actors',

    store: 'staticData.Actors',

    initComponent: function() {
        var me = this;

        me.columns = [
            {
                text: 'Actor Id',
                width: 100,
                dataIndex: 'id',
                filter: {
                    type: 'numeric'
                }
            },
            {
                text: 'First Name',
                flex: 1,
                dataIndex: 'firstName',
                editor: {
                    allowBlank: false,
                    maxLength: 45
                },
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Last Name',
                width: 200,
                dataIndex: 'lastName',
                editor: {
                    allowBlank: false,
                    maxLength: 45
                },
                filter: {
                    type: 'string'
                }
            }
        ];

        me.callParent(arguments);
    }
});