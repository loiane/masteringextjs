Ext.define('MasteringExtJS.view.staticdata.Actors', {
    extend: 'MasteringExtJS.view.staticdata.BaseGrid',

    xtype: 'actors',

    store: 'staticData.Actors',

    initComponent: function() {
        var me = this;

        me.columns = [
            {
                text: 'Actor Id',
                width: 100,
                dataIndex: 'actor_id',
                filter: {
                    type: 'numeric'
                }
            },
            {
                text: 'First Name',
                flex: 1,
                dataIndex: 'first_name',
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
                dataIndex: 'last_name',
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