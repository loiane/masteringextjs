Ext.define('Packt.view.reports.SalesFilmCategoryPie', {
    extend: 'Ext.chart.PolarChart',
    alias: 'widget.salesfilmcategorypie',

    legend: {
        docked: 'left'
    },
    interactions: ['rotate', 'itemhighlight'],

    bind: '{salesFilmCategory}',
    insetPadding: 40,
    innerPadding: 20,
    series: {
        type: 'pie',
        highlight: true,
        donut: 20,
        distortion: 0.6,
        style: {
            strokeStyle: 'white',
            opacity: 0.90
        },
        label: {
            field: 'category',
            display: 'rotate'
        },
        tooltip: {
            trackMouse: true,
            renderer: function(storeItem, item) {
                this.setHtml(storeItem.get('category') + ': ' + storeItem.get('total_sales'));
            }
        },
        xField: 'total_sales'
    }
});