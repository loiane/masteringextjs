Ext.define('Packt.view.toolbar.AddEditDelete', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.addeditdelete',

    flex: 1,
    dock: 'top',
    items: [
        {
            xtype: 'button',
            text: 'Add',
            itemId: 'add',
            iconCls: 'add'
        },
        {
            xtype: 'button',
            text: 'Edit',
            itemId: 'edit',
            iconCls: 'edit'
        },
        {
            xtype: 'button',
            text: 'Delete',
            itemId: 'delete',
            iconCls: 'delete'
        },
        {
            xtype: 'tbseparator'
        },
        {
            xtype: 'button',
            text: 'Print',
            itemId: 'print',
            iconCls: 'print'
        },
        {
            xtype: 'button',
            text: 'Export to PDF',
            itemId: 'pdf',
            iconCls: 'pdf'
        },
        {
            xtype: 'button',
            text: 'Export to Excel',
            itemId: 'excel',
            iconCls: 'excel'
        }
    ]
});