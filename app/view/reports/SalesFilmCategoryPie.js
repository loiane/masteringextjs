Ext.define('Packt.view.reports.SalesFilmCategoryPie', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.salesfilmcategorypie',

    animate: true,
    store: 'reports.SalesFilmCategory',
    shadow: true,
    legend: {
        position: 'right'
    },
    insetPadding: 60,
    theme: 'Base:gradients',
    series: [{
        type: 'pie',
        field: 'total_sales',
        showInLegend: true,
        tips: {
              trackMouse: true,
              width: 140,
              height: 28,
              renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('category') + ': ' + storeItem.get('total_sales'));
              }
        },
        highlight: {
          segment: {
            margin: 20
          }
        },
        label: {
            field: 'category',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }]
});