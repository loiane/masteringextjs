Ext.define('Packt.view.customer.Customers', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.customersgrid',

    requires: [
        'Ext.ux.RowExpander'
    ],

    store: 'customer.Customers',

    columnLines: true,
    viewConfig: {
        stripeRows: true
    },

    columns: [
        {
            text: 'Customer Id',
            width: 100,
            dataIndex: 'customer_id'
        },
        {
            text: 'First Name',
            flex: 1,
            dataIndex: 'first_name'
        },
        {
            text: 'Last Name', 
            width: 150,
            dataIndex: 'last_name'
        },
        {
            text: 'Email',
            width: 250,
            dataIndex: 'email'
        },
        {
            text: 'Active',
            width: 80,
            dataIndex: 'active',
            xtype: 'booleancolumn',
            trueText: 'yes',
            falseText: 'no'
        },
        {
            text: 'Create Date',
            width: 120,
            dataIndex: 'create_date'
        }
    ]
});