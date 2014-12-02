/**
 * A class which encapsulates a range of rows defining a selection in a grid.
 * @since 5.1.0
 */
Ext.define('Ext.grid.selection.Rows', {
    extend: 'Ext.grid.selection.Selection',

    requires: [
        'Ext.util.Collection'
    ],

    type: 'rows',

    /**
     * @property {Boolean} isRows
     * This property indicates the this selection represents selected rows.
     * @readonly
     */
    isRows: true,

    //-------------------------------------------------------------------------
    // Base Selection API

    /**
     * @inheritdoc
     */
    clear: function() {
        var me = this,
            view = me.view;

        // Flag when selectAll called.
        // While this is set, a call to contains will add the record to the collection and return true
        me.allSelected = false;

        if (me.selectedRecords) {
            me.each(function(record) {
                view.onRowDeselect(record);
            });
            me.selectedRecords.clear();
        }
    },

    /**
     * @inheritdoc
     */
    clone: function() {
        var me = this,
            result = new me.self(me.view);

        // Clone our record collection
        if (me.selectedRecords) {
            result.selectedRecords = me.selectedRecords.clone();
        }
        // Clone the current drag range
        if (me.rangeStart) {
            result.setRangeStart(me.rangeStart);
            result.setRangeEnd(me.rangeEnd);
        }
        return result;
    },

    /**
     * @inheritdoc
     */
    eachCell: function(fn, scope) {
        var me = this,
            selection = me.selectedRecords,
            view = me.view,
            columns = view.ownerGrid.getVisibleColumnManager().getColumns(),
            colCount,
            i,
            j,
            context,
            range,
            recCount,
            abort = false;

        if (columns) {
            colCount = columns.length;
            context = new Ext.grid.CellContext(view);

            // Use Collection#each instead of copying the entire dataset into an array and iterating that.
            if (selection) {
                selection.each(function(record) {
                    context.setRow(record);
                    for (i = 0; i < colCount; i++) {
                        context.setColumn(columns[i]);
                        if (fn.call(scope || me, context, context.colIdx, context.rowIdx) === false) {
                            abort = true;
                            return false;
                        }
                    }
                });
            }
            
            // If called during a drag select, or SHIFT+arrow select, include the drag range
            if (!abort && me.rangeStart != null) {
                range = me.getRange();
                me.view.dataSource.getRange(range[0], range[1], {
                    callback: function(records) {
                        recCount = records.length;
                        for (i = 0; !abort && i < recCount; i++) {
                            context.setRow(records[i]);
                            for (j = 0; !abort && j < colCount; j++) {
                                context.setColumn(columns[j]);
                                if (fn.call(scope || me, context, context.colIdx, context.rowIdx) === false) {
                                    abort = true;
                                }
                            }
                        }
                    }
                });
            }
        }
    },

    //-------------------------------------------------------------------------
    // Methods unique to this type of Selection

    add: function(record) {
        //<debug>
        if (!(record.isModel)) {
            Ext.Error.raise('Row selection must be passed a record');
        }
        //</debug>

        var selection = this.selectedRecords || (this.selectedRecords = this.createRecordCollection());

        if (!selection.byInternalId.get(record.internalId)) {
            selection.add(record);
            this.view.onRowSelect(record);
        }
    },

    remove: function(record) {
        //<debug>
        if (!(record.isModel)) {
            Ext.Error.raise('Row selection must be passed a record');
        }
        //</debug>

        var me = this;

        if (me.selectedRecords && me.selectedRecords.byInternalId.get(record.internalId)) {
            me.selectedRecords.remove(record);
            me.view.onRowDeselect(record);

            // Flag when selectAll called.
            // While this is set, a call to contains will add the record to the collection and return true
            me.allSelected = false;
            
            return true;
        }
    },

    /**
     * @private
     * Used during drag/shift+downarrow range selection on start.
     * @param {Number} The start row index of the row drag selection.
     */
    setRangeStart: function(start) {

        // Flag when selectAll called.
        // While this is set, a call to contains will add the record to the collection and return true
        this.allSelected = false;

        this.rangeStart = this.rangeEnd = start;
        this.view.onRowSelect(start);
    },

    /**
     * @private
     * Used during drag/shift+downarrow range selection on change of row.
     * @param {Number} The end row index of the row drag selection.
     */
    setRangeEnd: function(end) {
        var me = this,
            range,
            lastRange,
            rowIdx,
            row,
            view = me.view,
            store = view.dataSource,
            rows = view.all,
            selected = me.selectedRecords,
            rec;

        // Update the range as requested, then calculate the
        // range in lowest index first form
        me.rangeEnd = end;
        range = me.getRange();
        lastRange = me.lastRange || range;

        // Loop through the union of last range and current range
        for (rowIdx = Math.max(Math.min(range[0], lastRange[0]), rows.startIndex),
            end = Math.min(Math.max(range[1], lastRange[1]), rows.endIndex); rowIdx <= end; rowIdx++) {
            row = rows.item(rowIdx);

            // If we are outside the current range, deselect
            if (rowIdx < range[0] || rowIdx > range[1]) {
                // If we are deselecting, also remove from collection
                if (selected && (rec = selected.byInternalId.get(store.getAt(rowIdx).internalId))) {
                    selected.remove(rec);
                }
                row.removeCls(view.selectedItemCls);
            } else {
                row.addCls(view.selectedItemCls);
            }
        }

        me.lastRange = range;
    },

    getRange: function() {
        var start = this.rangeStart,
            end = this.rangeEnd;

        if (start == null) {
            return [0, -1];
        } else if (start <= end ){
            return [start, end];
        }
        return [end, start];
    },

    /**
     * Returns the size of the mousedown+drag, or SHIFT+arrow selection range.
     * @returns {Number}
     */
    getRangeSize: function() {
        var range = this.getRange();
        return range[1] - range[0] + 1;
    },

    /**
     * Returns `true` if the passed {@link Ext.data.Model record} is selected.
     * @param {Ext.data.Model} record The record to test.
     * @returns {Boolean} `true` if the passed {@link Ext.data.Model record} is selected.
     */
    contains: function(record) {
        //<debug>
        if (!(record.isModel)) {
            Ext.Error.raise('Row selection must be passed a record');
        }
        //</debug>
        var recIndex,
            result = false,
            dragRange;

        // Flag set when selectAll is called in th selModel.
        // This allows buffered stores to treat all *rendered* records
        // as selected, so that the selection model will always encompass
        // What the user *sees* as selected
        if (this.allSelected) {
            this.add(record);
            return true;
        }

        // First check if the record is in our collection
        if (this.selectedRecords) {
            result = !!this.selectedRecords.byInternalId.get(record.internalId);
        }

        // If not, check if it is within our drag range if we are in the middle of a drag select
        if (!result && this.rangeStart != null) {
            dragRange = this.getRange();
            recIndex = this.view.dataSource.indexOf(record);
            result = recIndex >= dragRange[0] && recIndex <= dragRange[1];
        }
        return result;
    },

    /**
     * Returns the number of records selected
     * @returns {Number} The number of records selected.
     */
    getCount: function() {
        var me = this,
            selectedRecords = me.selectedRecords,
            result = selectedRecords ? selectedRecords.getCount() : 0,
            range = me.getRange(),
            i,
            store = me.view.store;

        // If dragging, add all records in the drag that are *not* in the collection
        for (i = range[0]; i <= range[1]; i++) {
            if (!selectedRecords || !selectedRecords.byInternalId.get(store.getAt(i).internalId)) {
                result++;
            }
        }
        return result;
    },

    getSelected: function() {
        var selectedRecords = this.selectedRecords;
        return selectedRecords ? selectedRecords.getRange() : [];
    },

    selectAll: function() {
        var me = this;

        me.clear();
        me.setRangeStart(0);
        me.setRangeEnd(me.view.dataSource.getCount() - 1);

        // While this is set, a call to contains will add the record to the collection and return true
        me.allSelected = true;

        // Adds the records to the collection
        me.addRange();
    },

    /**
     * Calls the passed function for each record in the selection.
     *
     * An {@link Ext.data.Model} object representing each cell is passed to the function.
     * @param {Function} fn
     * @param {Ext.data.Model} fn.record A selected record.
     * If this returns false, the iteration is halted with no further calls.
     * @param {Object} [scope] The context (`this` reference) in which the function is executed.
     * Defaults to this Selection object.
     */
    each: function(fn, scope) {
        if (this.selectedRecords) {
            this.selectedRecords.each(fn, scope || this);
        }
    },

    createRecordCollection: function() {
        var result = new Ext.util.Collection({
                rootProperty: 'data',
                extraKeys: {
                    byInternalId: {
                        rootProperty: false,
                        property: 'internalId'
                    }
                }
            });

        return result;
    },

    /**
     * @private
     * Called at the end of a drag, or shift+downarrow row range select.
     * The record range delineated by the start and end row indices is added to the selected Collection.
     * @returns {undefined}
     */
    addRange: function() {
        var me = this,
            range,
            selection;

        if (me.rangeStart != null) {
            range = me.getRange();
            selection = me.selectedRecords || (me.selectedRecords = me.createRecordCollection());
            me.view.dataSource.getRange(range[0], range[1], {
                callback: function(range) {
                    selection.add.apply(selection, range);
                }
            });

            // Clear the drag range
            me.setRangeStart(me.lastRange = null);
        }
    },

    destroy: function() {
        Ext.destroy(this.selectedRecords);
    }
});
