Ext.define('Packt.view.sakila.SakilaGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sakilagrid',

    requires: [
        'Packt.view.toolbar.AddEditDelete'
    ],

    columnLines: true,
    viewConfig: {
        stripeRows: true
    },

    dockedItems: [
        {
            xtype: 'addeditdelete'
        }
    ],

    initComponent: function() {
        var me = this;

        me.columns = Ext.Array.merge(me.columns,
            [{
                xtype    : 'datecolumn',
                text     : 'Last Update', 
                width    : 120,  
                dataIndex: 'last_update',
                format: 'Y-m-j H:i:s',
                filter: true
            }]
        );

        me.callParent(arguments);
    }   
});