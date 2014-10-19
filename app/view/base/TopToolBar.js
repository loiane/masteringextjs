Ext.define('Packt.view.base.TopToolBar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'top-tool-bar',

    requires: [
        'Packt.util.Glyphs'
    ],

    dock: 'top',
    items: [
        {
            xtype: 'button',
            text: 'Add',
            itemId: 'add',
            glyph: Packt.util.Glyphs.getGlyph('add'),
            listeners: {
                click: 'onAdd'
            }
        }/*,
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
        }*/
    ]
});