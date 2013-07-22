StartTest(function(t) {
    t.diag('Grid');
    
    var grid = t.getGrid();

    t.waitForRowsVisible(grid, function() {
        t.expectPass(function (t) {
            t.is(t.getFirstRow(grid).dom, Ext.select(grid.getView().rowSelector).item(0).dom, 'getFirstRow OK');
            t.matchGridCellContent(grid, 0, 0, 'Foo', 'matchGridCellContent OK');
        });
    
        t.expectFail(function (t) {
            t.matchGridCellContent(grid, 0, 0, 'ASD', 'matchGridCellContent fails OK');
        });
    });
});