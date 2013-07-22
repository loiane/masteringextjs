Ext.define('Packt.view.reports.SalesFilmCategoryBar', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.salesfilmcategorybar',

    animate: true,
    store: 'reports.SalesFilmCategory',
    shadow: true,
    insetPadding: 60,
    theme: 'Base:gradients',
    axes: [{
        type: 'Numeric',
        position: 'bottom',
        fields: ['total_sales'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Total Sales',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'left',
        fields: ['category'],
        title: 'Film Category'
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item, attr) {
            this.setTitle(storeItem.get('category') + ': ' + storeItem.get('total_sales') + ' $');
          }
        },
        label: {
          display: 'insideEnd',
          'text-anchor': 'middle',
            field: 'total_sales',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
            contrast: true
        },
        xField: 'category',
        yField: 'total_sales'
  }]
});