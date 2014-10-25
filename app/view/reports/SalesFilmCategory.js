Ext.define('Packt.view.reports.SalesFilmCategory', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.salesfilmcategory',

    requires: [
        'Packt.view.reports.SalesFilmCategoryModel',
        'Packt.view.reports.SalesFilmCategoryController',
        'Packt.view.reports.SalesFilmCategoryPie',
        'Packt.view.reports.SalesFilmCategoryColumn',
        'Packt.view.reports.SalesFilmCategoryBar',
        'Packt.util.Glyphs'
    ],

    controller: 'sales-film-category',
    viewModel: {
        type: 'sales-film-category'
    },

    layout: 'card',
    activeItem: 0,

    items: [{
        xtype: 'salesfilmcategorypie'
    },{
        xtype: 'salesfilmcategorycol'
    },{
        xtype: 'salesfilmcategorybar'
    }],

    dockedItems: [{
        xtype: 'toolbar',
        flex: 1,
        dock: 'top',
        items: [
            {
                text: 'Change Chart Type',
                glyph: Packt.util.Glyphs.getGlyph('menuReports'),
                menu: {
                    xtype: 'menu',
                    defaults: {
                        listeners: {
                            click: 'onChangeChart'
                        }
                    },
                    items: [
                        {
                            xtype: 'menuitem',
                            text: 'Pie',
                            itemId: 'pie',
                            glyph: Packt.util.Glyphs.getGlyph('chartPie')
                        },
                        {
                            xtype: 'menuitem',
                            text: 'Column',
                            itemId: 'column',
                            glyph: Packt.util.Glyphs.getGlyph('chartBar')
                        },
                        {
                            xtype: 'menuitem',
                            text: 'Bar',
                            itemId: 'bar',
                            glyph: Packt.util.Glyphs.getGlyph('chartColumn')
                        }
                    ]
                }
            },
            {
                text: 'Download Chart',
                glyph: Packt.util.Glyphs.getGlyph('download'),
                menu: {
                    xtype: 'menu',
                    defaults: {
                        listeners: {
                            click: 'onChartDownload'
                        }
                    },
                    items: [
                        {
                            xtype: 'menuitem',
                            text: 'Download as Image',
                            itemId: 'png',
                            glyph: Packt.util.Glyphs.getGlyph('image')
                        },
                        {
                            xtype: 'menuitem',
                            text: 'Download as PDF',
                            itemId: 'pdf',
                            glyph: Packt.util.Glyphs.getGlyph('pdf')
                        }
                    ]
                }
            }
        ]
    }]
});