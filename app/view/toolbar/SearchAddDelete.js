Ext.define('Packt.view.toolbar.SearchAddDelete', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.searchadddelete',

    flex: 1,
    dock: 'top',
    items: [
        {
            xtype: 'button',
            text: 'Search and Add',
            itemId: 'add',
            iconCls: 'find'
        },
        {
            xtype: 'button',
            text: 'Delete',
            itemId: 'delete',
            iconCls: 'delete'
        }
    ]
});