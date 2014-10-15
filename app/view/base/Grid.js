Ext.define('Packt.view.base.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'base-grid',

    requires: [
        'Packt.util.Glyphs',
        'Packt.view.base.TopToolBar'
    ],

    columnLines: true,
    viewConfig: {
        stripeRows: true
    },

    /*dockedItems: [
        {
            xtype: 'top-tool-bar'
        }
    ],*/

    initComponent: function() {
        var me = this;

        me.columns = Ext.Array.merge(
            me.columns,
            [{
                xtype    : 'datecolumn',
                text     : 'Last Update',
                width    : 150,
                dataIndex: 'last_update',
                format: 'Y-m-j H:i:s',
                filter: true
            },{
                xtype: 'widgetcolumn',
                width: 50,
                sortable: false,
                menuDisabled: true,
                widget: {
                    xtype: 'button',
                    glyph: Packt.util.Glyphs.getGlyph('edit'),
                    tooltip: 'Edit',
                    handler: 'onEdit'
                }
            },{
                xtype: 'widgetcolumn',
                width: 50,
                sortable: false,
                menuDisabled: true,
                widget: {
                    xtype: 'button',
                    glyph: Packt.util.Glyphs.getGlyph('destroy'),
                    tooltip: 'Delete',
                    handler: 'onDelete'
                }
            }]
        );

        me.callParent(arguments);
    }
});