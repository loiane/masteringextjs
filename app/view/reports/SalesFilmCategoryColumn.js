Ext.define('Packt.view.reports.SalesFilmCategoryColumn', {
    extend: 'Ext.chart.CartesianChart',
    alias: 'widget.salesfilmcategorycol',

    requires: [
        'Packt.view.charts.touch.ColumnSprite3D',
        'Packt.view.charts.touch.ColumnSeries3D'
    ],

    bind: '{salesFilmCategory}',

    insetPadding: {
        top: 40,
        bottom: 40,
        left: 20,
        right: 40
    },
    interactions: 'itemhighlight',

    axes: [{
        type: 'numeric',
        position: 'left',
        fields: ['total_sales'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        titleMargin: 20,
        title: {
            text: 'Total Sales',
            fontSize: 14
        },
        grid: true,
        minimum: 0
    }, {
        type: 'category',
        position: 'bottom',
        fields: ['category'],
        titleMargin: 20,
        title: {
            text: 'Film Category',
            fontSize: 14
        }
    }],
    series: [{
        type: 'column3d',
        //axis: 'left',
        highlight: true,
        style: {
            minGapWidth: 20
        },
        label: {
            display: 'insideEnd',
            'text-anchor': 'middle',
            field: 'total_sales',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333'
        },
        xField: 'category',
        yField: 'total_sales'
    }]
});