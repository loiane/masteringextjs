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
            glyph: Packt.util.Glyphs.getGlyph('add'),
            listeners: {
                click: 'onAdd'
            }
        },
        {
            xtype: 'tbseparator'
        },
        {
            xtype: 'button',
            text: 'Print',
            glyph: Packt.util.Glyphs.getGlyph('print'),
            listeners: {
                click: 'onPrint'
            }
        },
        {
            xtype: 'button',
            text: 'Export to PDF',
            glyph: Packt.util.Glyphs.getGlyph('pdf'),
            listeners: {
                click: 'onExportPDF'
            }
        },
        {
            xtype: 'button',
            text: 'Export to Excel',
            glyph: Packt.util.Glyphs.getGlyph('excel'),
            listeners: {
                click: 'onExportExcel'
            }
        }
    ]
});