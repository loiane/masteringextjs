/**
 * Base class for selections which may be of three subtypes:
 *
 * - {@link Ext.grid.selection.Cells Cells} A rectangular range of cells defined by a start
 *   record/column and an end record/column.
 * - {@link Ext.grid.selection.Rows Rows} An array of records.
 * - {@link Ext.grid.selection.Columns Columns} An array of columns in which all records
 *   are included.
 *
 * @since 5.1.0
 */
Ext.define('Ext.grid.selection.Selection', {
    
    constructor: function(view) {
        //<debug>
        if (!view || !(view instanceof Ext.view.Table)) {
            Ext.Error.raise('Selection must be created for a given TableView');
        }
        //</debug>
        this.view = view;
    }

    /**
     * Clones this selection object.
     * @method clone
     * @return {Ext.grid.selection.Selection} A clone of this instance.
     */

    /**
     * Clears the selection represented by this selection object.
     * @method clear
     */

    /**
     * Calls the passed function for each cell in the selection from top left to bottom right
     * iterating over columns within each row.
     *
     * @method eachCell
     * @param {Function} fn The function to call. If this returns false, the iteration is
     * halted with no further calls.
     * @param {Ext.grid.CellContext} fn.context The CellContext representing a selected cell.
     * @param {Number} fn.columnIndex The column index of the current cell.
     * @param {Number} fn.rowIndex The row index of the current cell.
     * @param {Object} [scope] The context (`this` reference) in which `fn` is executed.
     * Defaults to this Selection object.
     */
});
