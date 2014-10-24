Ext.define('Packt.view.reports.SalesFilmCategoryBar', {
    extend: 'Ext.chart.CartesianChart',
    alias: 'widget.salesfilmcategorybar',

    bind: '{salesFilmCategory}',

    insetPadding: 40,
    interactions: 'itemhighlight',
    flipXY: true,

    axes: [{
        type: 'numeric',
        position: 'bottom',
        fields: ['total_sales'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Total Sales',
        grid: true,
        minimum: 0
    }, {
        type: 'category',
        position: 'left',
        fields: ['category'],
        title: 'Film Category'
    }],
    series: [{
        type: 'bar',
        highlight: {
            strokeStyle: 'black',
            //fillStyle: '#57cbd1',
            radius: 5
        },
        tooltip: {
            trackMouse: true,
            style: 'background: #fff',
            //width: 140,
            //height: 28,
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