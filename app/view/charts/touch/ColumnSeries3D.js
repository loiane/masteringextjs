/**
 * From http://dev.sencha.com/ext/5.0.1/examples/kitchensink/?charts=true#column-3d
 */
Ext.define('Packt.view.charts.touch.ColumnSeries3D', {
    extend: 'Ext.chart.series.Bar',
    requires: ['Packt.view.charts.touch.ColumnSprite3D'],
    seriesType: 'columnSeries3d',
    alias: 'series.column3d',
    type: 'column3d',
    config: {
        itemInstancing: null
    }
});