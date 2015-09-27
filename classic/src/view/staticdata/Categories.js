Ext.define('MasteringExtJS.view.staticdata.Categories', {
    extend: 'MasteringExtJS.view.staticdata.BaseGrid',

    requires: [
        'MasteringExtJS.store.staticData.Categories'
    ],

    xtype: 'categories',

    store: 'staticData.Categories',

    initComponent: function() {
        var me = this;

        me.columns = [
            {
                text: 'Category Id',
                width: 100,
                dataIndex: 'id',
                filter: {
                    type: 'numeric'
                }
            },
            {
                text: 'Category Name',
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
        ];

        me.callParent(arguments);
    }
});