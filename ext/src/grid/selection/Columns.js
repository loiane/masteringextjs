/**
 * A class which encapsulates a range of columns defining a selection in a grid.
 * @since 5.1.0
 */
Ext.define('Ext.grid.selection.Columns', {
    extend: 'Ext.grid.selection.Selection',

    type: 'columns',

    /**
     * @property {Boolean} isColumns
     * This property indicates the this selection represents selected columns.
     * @readonly
     */
    isColumns: true,

    //-------------------------------------------------------------------------
    // Base Selection API

    /**
     * @inheritdoc
     */
    clear: function() {
        var me = this,
            prevSelection = me.selectedColumns;

        if (prevSelection && prevSelection.length) {
            me.selectedColumns = [];
            me.refreshColumns.apply(me, prevSelection);
        }
    },

    /**
     * @inheritdoc
     */
    clone: function() {
        var me = this,
            result = new me.self(me.view),
            columns = me.selectedColumns;

        if (columns) {
            result.selectedColumns = Ext.Array.slice(columns);
        }
        return result;
    },

    /**
     * @inheritdoc
     */
    eachCell: function (fn, scope) {
        var me = this,
            view = me.view,
            columns = me.selectedColumns,
            len,
            i,
            context = new Ext.grid.CellContext(view);

        if (columns) {
            len = columns.length;

            // Use Store#each instead of copying the entire dataset into an array and iterating that.
            view.dataSource.each(function(record) {
                context.setRow(record);
                for (i = 0; i < len; i++) {
                    context.setColumn(columns[i]);
                    if (fn.call(scope || me, context, context.colIdx, context.rowIdx) === false) {
                        return false;
                    }
                }
            });
        }
    },

    //-------------------------------------------------------------------------
    // Methods unique to this type of Selection

    /**
     * @private
     * Adds the passed Column to the selection.
     * @param {Ext.grid.column.Column} column
     */
    add: function(column) {
        //<debug>
        if (!column.isColumn) {
            Ext.Error.raise('Column selection must be passed a grid Column header object');
        }
        //</debug>

        Ext.Array.include((this.selectedColumns || (this.selectedColumns = [])), column);
        this.refreshColumns(column);
    },

    /**
     * @private
     * Removes the passed Column from the selection.
     * @param {Ext.grid.column.Column} column
     */
    remove: function(column) {
        //<debug>
        if (!column.isColumn) {
            Ext.Error.raise('Column selection must be passed a grid Column header object');
        }
        //</debug>

        if (this.selectedColumns) {
            Ext.Array.remove(this.selectedColumns, column);
            this.refreshColumns(column);
        }
    },

    /**
     * Returns `true` if the passed {@link Ext.grid.column.Column column} is selected.
     * @param {Ext.grid.column.Column} column The column to test.
     * @returns {Boolean} `true` if the passed {@link Ext.grid.column.Column column} is selected.
     */
    contains: function(column) {
        //<debug>
        if (!column.isColumn) {
            Ext.Error.raise('Column selection must be passed a grid Column header object');
        }
        //</debug>

        if (this.selectedColumns && this.selectedColumns.length) {
            return Ext.Array.contains(this.selectedColumns, column);
        }
        return false;
    },

    /**
     * Returns the number of columns selected.
     * @returns {Number} The number of columns selected.
     */
    getCount: function() {
        var selectedColumns = this.selectedColumns;
        return selectedColumns ? selectedColumns.length : 0;
    },

    /**
     * @private
     * Returns the columns selected.
     * @returns {Ext.grid.column.Column[]} The columns selected.
     */
    getSelected: function() {
        return this.selectedColumns || [];
    },

    selectAll: function() {
        var me = this;

        me.clear();
        me.selectedColumns = me.view.getVisibleColumnManager().getColumns();
        me.refreshColumns.apply(me, me.selectedColumns);
    },

    refreshColumns: function(column) {
        var me = this,
            view = me.view,
            rows = view.all,
            rowIdx,
            columns = arguments,
            len = columns.length,
            colIdx,
            cellContext = new Ext.grid.CellContext(view),
            selected = [];

        for (colIdx = 0; colIdx < len; colIdx++) {
            selected[colIdx] = me.contains(columns[colIdx]);
        }

        for (rowIdx = rows.startIndex; rowIdx <= rows.endIndex; rowIdx++) {
            cellContext.setRow(rowIdx);
            for (colIdx = 0; colIdx < len; colIdx++) {
                // Note colIdx is not the column's visible index. setColumn must be passed the column object
                cellContext.setColumn(columns[colIdx]);
                if (selected[colIdx]) {
                    view.onCellSelect(cellContext);
                } else {
                    view.onCellDeselect(cellContext);
                }
            }
        }
    }
});
