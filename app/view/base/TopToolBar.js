Ext.define('Packt.view.base.TopToolBar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'top-tool-bar',

    requires: [
        'Packt.util.Glyphs',
        'Packt.view.base.CustomButton'
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
            xtype: 'custom-btn',
            text: 'Print',
            glyph: Packt.util.Glyphs.getGlyph('print'),
            listeners: {
                click: 'onPrint'
            }
        },
        {
            xtype: 'custom-btn',
            text: 'Export to PDF',
            glyph: Packt.util.Glyphs.getGlyph('pdf'),
            listeners: {
                click: 'onExportPDF'
            }
        },
        {
            xtype: 'custom-btn',
            text: 'Export to Excel',
            glyph: Packt.util.Glyphs.getGlyph('excel'),
            listeners: {
                click: 'onExportExcel'
            }
        }
    ]
});