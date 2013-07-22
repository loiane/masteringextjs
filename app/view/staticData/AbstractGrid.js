Ext.define('Packt.view.staticData.AbstractGrid', {
    extend: 'Ext.ux.LiveSearchGridPanel',
    alias: 'widget.staticdatagrid',

    columnLines: true,
    viewConfig: {
        stripeRows: true
    },

    initComponent: function() {
        var me = this;

        me.selModel = {
            selType: 'cellmodel'
        };

        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1,
                pluginId: 'cellplugin'
            })
        ];

        me.features = [
            Ext.create('Ext.ux.grid.FiltersFeature', {
                local: true
            })
        ];

        me.dockedItems = [
            {
               xtype: 'toolbar',
               dock: 'top',
               itemId: 'topToolbar',
               items: [
                    {
                        xtype: 'button',
                        itemId: 'add',
                        text: 'Add',
                        iconCls: 'add'
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        itemId: 'save',
                        text: 'Save Changes',
                        iconCls: 'save_all'
                    },
                    {
                        xtype: 'button',
                        itemId: 'cancel',
                        text: 'Cancel Changes',
                        iconCls: 'cancel'
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        itemId: 'clearFilter',
                        text: 'Clear Filters',
                        iconCls: 'clear_filter'
                    }
               ] 
            }
        ];

        me.columns = Ext.Array.merge(me.columns,
            [{
                xtype    : 'datecolumn',
                text     : 'Last Update', 
                width    : 120,  
                dataIndex: 'last_update',
                format: 'Y-m-j H:i:s',
                filter: true
            },
            {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [
                    {
                        handler: function(view, rowIndex, colIndex, item, e) {
                            this.fireEvent('itemclick', this, 'delete', view, rowIndex, colIndex, item, e);
                        },
                        iconCls: 'delete',
                        tooltip: 'Delete'
                    }
                ]
            }]
        );

        me.callParent(arguments);
    }
});