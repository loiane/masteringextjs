/**
 * A class which encapsulates a range of cells defining a selection in a grid.
 *
 * Note that when range start and end points are represented by an array, the
 * order is traditional `x, y` order, that is column index followed by row index.
 * @since 5.1.0
 */
Ext.define('Ext.grid.selection.Cells', {
    extend: 'Ext.grid.selection.Selection',

    type: 'cells',

    /**
     * @property {Boolean} isCells
     * This property indicates the this selection represents selected cells.
     * @readonly
     */
    isCells: true,

    //-------------------------------------------------------------------------
    // Base Selection API

    /**
     * @inheritdoc
     */
    clear: function() {
        var me = this,
            view = me.view;

        me.eachCell(function(cellContext) {
            view.onCellDeselect(cellContext);
        });
        me.startCell = me.endCell = null;
    },

    /**
     * @inheritdoc
     */
    clone: function() {
        var me = this,
            result = new me.self(me.view);

        if (me.startCell) {
            result.startCell = me.startCell.clone();
            result.endCell = me.endCell.clone();
        }
        return result;
    },

    /**
     * @inheritdoc
     */
    eachCell: function(fn, scope) {
        var me = this,
            rowRange = me.getRowRange(),
            colRange = me.getColumnRange(),
            context = new Ext.grid.CellContext(me.view),
            rowIdx, colIdx;

        for (rowIdx = rowRange[0]; rowIdx <= rowRange[1]; rowIdx++) {
            context.setRow(rowIdx);
            for (colIdx = colRange[0]; colIdx <= colRange[1]; colIdx++) {
                context.setColumn(colIdx);
                if (fn.call(scope || me, context, colIdx, rowIdx) === false) {
                    return;
                }
            }
        }
    },

    //-------------------------------------------------------------------------
    // Methods unique to this type of Selection

    /**
     * @private
     * Used during drag/shift+downarrow range selection on start.
     * @param {Ext.grid.CellContext} startCell The start cell of the cell drag selection.
     */
    setRangeStart: function (startCell) {
        // Must clone them. Users might use one instance and reconfigure it to navigate.
        this.startCell = (this.endCell = startCell.clone()).clone();
        this.view.onCellSelect(startCell);
    },

    /**
     * @private
     * Used during drag/shift+downarrow range selection on drag.
     * @param {Ext.grid.CellContext} endCell The end cell of the cell drag selection.
     */
    setRangeEnd: function (endCell) {
        var me = this,
            range,
            lastRange,
            rowStart,
            rowEnd,
            colStart,
            colEnd,
            rowIdx,
            colIdx,
            view = me.view,
            rows = view.all,
            cell = new Ext.grid.CellContext(view),
            maxColIdx = view.getVisibleColumnManager().getColumns().length - 1;

        me.endCell = endCell.clone();
        range = me.getRange();
        lastRange = me.lastRange || range;

        rowStart = Math.max(Math.min(range[0][1], lastRange[0][1]), rows.startIndex);
        rowEnd   = Math.min(Math.max(range[1][1], lastRange[1][1]), rows.endIndex);

        colStart = Math.min(range[0][0], lastRange[0][0]);
        colEnd   = Math.min(Math.max(range[1][0], lastRange[1][0]), maxColIdx);

        // Loop through the union of last range and current range
        for (rowIdx = rowStart; rowIdx <= rowEnd; rowIdx++) {
            for (colIdx = colStart; colIdx <= colEnd; colIdx++) {
                cell.setPosition(rowIdx, colIdx);

                // If we are outside the current range, deselect
                if (rowIdx < range[0][1] || rowIdx > range[1][1] || colIdx < range[0][0] || colIdx > range[1][0]) {
                    view.onCellDeselect(cell);
                } else {
                    view.onCellSelect(cell);
                }
            }
        }
        me.lastRange = range;
    },

    /**
     * @returns {Number[][]} The `[[x, y],[x,y]]` coordinates in top-left to bottom-right order
     * of the current selection.
     */
    getRange: function() {
        if (!this.startCell) {
            return [[0, 0],[-1, -1]];
        }
        var colRange = this.getColumnRange(),
            rowRange = this.getRowRange();

        return [[colRange[0], rowRange[0]], [colRange[1], rowRange[1]]];
    },

    /**
     * Returns the size of the selection rectangle.
     * @returns {Number}
     */
    getRangeSize: function() {
        return this.getCount();
    },

    /**
     * Returns `true` if the passed {@link Ext.grid.CellContext cell context} is selected.
     * @param {Ext.grid.CellContext} cellContext The cell context to test.
     * @returns {Boolean} `true` if the passed {@link Ext.grid.CellContext cell context} is selected.
     */
    contains: function(cellContext) {
        var range;

        //<debug>
        if (!cellContext.isCellContext) {
            Ext.Error.raise('CellSelection.contains must be passed an Ext.grid.CellContext');
        }
        //</debug>
        if (this.startCell) {
            // get start and end rows in the range
            range = this.getRowRange();
            if (cellContext.rowIdx >= range[0] && cellContext.rowIdx <= range[1]) {
                // get start and end columns in the range
                range = this.getColumnRange();
                return (cellContext.colIdx >= range[0] && cellContext.colIdx <= range[1]);
            }
        }
        return false;
    },

    /**
     * Returns the number of cells selected
     * @returns {Number} The nuimber of cells selected
     */
    getCount: function() {
        var range = this.getRange();

        return (range[1][0] - range[0][0] + 1) * (range[1][1] - range[0][1] + 1);
    },

    /**
     * @hide
     */
    getSelected: function() {
    },

    selectAll: function() {
        var me = this,
            view = me.view;

        me.clear();
        me.setRangeStart(new Ext.grid.CellContext(view).setPosition(0, 0));
        me.setRangeEnd(new Ext.grid.CellContext(view).setPosition(view.dataSource.getCount() - 1, view.getVisibleColumnManager().getColumns().length - 1));
    },

    /**
     * @private
     * @returns {Number[]} The column range which encapsulates the range.
     */
    getColumnRange: function() {
        if (!this.startCell) {
            return [0, -1];
        }
        var start = this.startCell.colIdx,
            end = this.endCell.colIdx;

        return start <= end ? [start, end] : [end, start];
    },

    /**
     * @private
     * @returns {Number[]} The row range which encapsulates the range - the view range that needs updating.
     */
    getRowRange: function() {
        if (!this.startCell) {
            return [0, -1];
        }
        var start = this.startCell.rowIdx,
            end   = this.endCell.rowIdx;

        return start <= end ? [start, end] : [end, start];
    }
});
