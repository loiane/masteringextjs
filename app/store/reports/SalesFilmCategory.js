Ext.define('Packt.store.reports.SalesFilmCategory', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.proxy.Sakila'
    ],

    fields: [
        {name: 'category'},
        {name: 'total_sales'}
    ],

    autoLoad: true,

    proxy: {
        type: 'sakila',
        url: 'php/reports/salesFilmCategory.php'
    }
});