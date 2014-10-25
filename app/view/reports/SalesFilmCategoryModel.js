Ext.define('Packt.view.reports.SalesFilmCategoryModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.sales-film-category',

    stores: {
        salesFilmCategory: {
            fields: [
                {name: 'category'},
                {name: 'total_sales'}
            ],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'php/reports/salesFilmCategory.php',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});