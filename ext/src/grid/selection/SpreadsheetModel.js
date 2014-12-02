/**
 * A selection model for {@link Ext.grid.Panel grids} which allows you to select data in
 * a spreadsheet-like manner.
 *
 * Supported features:
 *
 *  - Single / Range / Multiple individual row selection.
 *  - Single / Range cell selection.
 *  - Column selection by click selecting column headers.
 *  - Select / deselect all by clicking in the top-left, header.
 *  - Adds row number column to enable row selection.
 *  - Optionally you can enable row selection using checkboxes
 *
 * # Example usage
 *
 *     @example
 *     var store = Ext.create('Ext.data.Store', {
 *         fields: [ 'name', 'email', 'phone' ],
 *
 *         data: {
 *             items: [
 *                 { name: 'Lisa',  email: 'lisa@simpsons.com',  phone: '555-111-1224' },
 *                 { name: 'Bart',  email: 'bart@simpsons.com',  phone: '555-222-1234' },
 *                 { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
 *                 { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
 *             ]
 *         },
 *
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 root: 'items'
 *             }
 *         }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: store,
 *         width: 400,
 *         renderTo: Ext.getBody(),
 *
 *         columns: [
 *             { text: 'Name',  dataIndex: 'name'  },
 *             { text: 'Email', dataIndex: 'email', flex: 1 },
 *             { text: 'Phone', dataIndex: 'phone' }
 *         ],
 *
 *         selModel: {
 *            type: 'spreadsheet'
 *         }
 *     });
 *
 * @since 5.1.0
 */
Ext.define('Ext.grid.selection.SpreadsheetModel', {
    extend: 'Ext.selection.Model',
    requires: [
        'Ext.grid.selection.Selection',
        'Ext.grid.selection.Cells',
        'Ext.grid.selection.Rows',
        'Ext.grid.selection.Columns'
    ],

    alias: 'selection.spreadsheet',

    isSpreadsheetModel: true,

    config: {
        /**
         * @cfg {Boolean} [columnSelect=false]
         * Set to `true` to enable selection of columns.
         *
         * **NOTE**: This will remove sorting on header click and instead provide column
         * selection and deselection. Sorting is still available via column header menu.
         */
        columnSelect: {
            $value: false,
            lazy: true
        },

        /**
         * @cfg {Boolean} [cellSelect=true]
         * Set to `true` to enable selection of individual cells or a single rectangular
         * range of cells. This will provide cell range selection using click, and
         * potentially drag to select a rectangular range. You can also use "SHIFT + arrow"
         * key navigation to select a range of cells.
         */
        cellSelect: {
            $value: true,
            lazy: true
        },

        /**
         * @cfg {Boolean} [rowSelect=true]
         * Set to `true` to enable selection of rows by clicking on a row number column.
         *
         * *Note*: This feature will add the row number as the first column.
         */
        rowSelect: {
            $value: true,
            lazy: true
        },

        /**
        * @cfg {Boolean} dragSelect [dragSelect=true]
        * Set to `true` to enables cell range selection by cell dragging.
        */
        dragSelect: {
            $value: true,
            lazy: true
        }
    },

    /**
     * @event selectionchange
     * Fired *by the grid* after the selection changes.
     * @param {Ext.grid.Panel} grid The grid whose selection has changed.
     * @param {Ext.grid.selection.Selection} selection A subclass of
     * {@link Ext.grid.selection.Selection} describing the new selection.
     */

    /**
     * @cfg {Boolean} checkboxSelect [checkboxSelect=false]
     * Enables selection of the row via clicking on checkbox. Note: this feature will add
     * new column at position specified by {@link #checkboxColumnIndex}.
     */
    checkboxSelect: false,

    /**
     * @cfg {Number/String} [checkboxColumnIndex=0]
     * The index at which to insert the checkbox column.
     * Supported values are a numeric index, and the strings 'first' and 'last'.
     */
    checkboxColumnIndex: 0,

    /**
     * @cfg {Boolean} showHeaderCheckbox
     * Configure as `true` to display the header checkbox at the top of the column.
     * When the store is a {@link Ext.data.BufferedStore BufferedStore}, this configuration will
     * not be available because the buffered data set does not always contain all data.
     */
    showHeaderCheckbox: true,

    /**
     * @cfg {String} [checkSelector="x-grid-row-checker"]
     * The selector for determining whether the checkbox element is clicked. This may be changed to
     * allow for a wider area to be clicked, for example, the whole cell for the selector.
     */
    checkSelector: '.' + Ext.baseCSSPrefix + 'grid-row-checker',

    /**
     * @cfg {Number/String} [checkboxHeaderWidth=24]
     * Width of checkbox column.
     */
    checkboxHeaderWidth: 24,

    /**
     * @cfg {Number/String} [rowNumbererHeaderWidth=46]
     * Width of row numbering column.
     */
    rowNumbererHeaderWidth: 46,

    // private
    checkerOnCls: Ext.baseCSSPrefix + 'grid-hd-checker-on',

    tdCls: Ext.baseCSSPrefix + 'grid-cell-special ' + Ext.baseCSSPrefix + 'grid-cell-row-checker',

    /**
     * @private
     * Show/hide the extra column headers depending upon rowSelection
     */
    updateRowSelect: function(rowSelect) {
        var me = this,
            sel = me.selectionData;

        if (rowSelect) {
            if (me.checkColumn) {
                me.checkColumn.show();
            }
            if (me.numbererColumn) {
                me.numbererColumn.show();
            } else {
                me.numbererColumn = me.view.headerCt.add(0, {
                    xtype: 'rownumberer',
                    width: me.rowNumbererHeaderWidth,
                    editRenderer:  '&#160;'
                });
            }
        } else {
            if (me.checkColumn) {
                me.checkColumn.hide();
            }
            if (me.numbererColumn) {
                me.numbererColumn.hide();
            }
        }
        if (!rowSelect && sel && sel.isRows) {
            sel.clear();
        }
    },

    /**
     * @private
     * Enable/disable the HeaderContainer's sortOnClick in line with column select on column click
     */
    updateColumnSelect: function(columnSelect) {
        var me = this,
            sel = me.selectionData,
            views = me.views,
            len = views.length,
            i;

        for (i = 0; i < len; i++) {
            views[i].headerCt.sortOnClick = !columnSelect;
        }
        if (!columnSelect && sel && sel.isColumns) {
            sel.clear();
        }
    },

    updateCellSelect: function(cellSelect) {
        var me = this,
            sel = me.selectionData;

        if (!cellSelect && sel && sel.isCells) {
            sel.clear();
        }
    },

    bindComponent: function(view) {
        var me = this,
            viewListeners;

        if (me.view !== view) {
            if (me.view) {
                me.navigationModel = null;
                Ext.destroy(me.viewListeners, me.navigationListeners);
            }
            me.view = view;
            if (view) {
                me.gridListeners = view.ownerGrid.on({
                    columnschanged: me.onColumnsChanged,
                    scope: me,
                    destroyable: true
                });

                viewListeners = me.getViewListeners();
                viewListeners.scope = me;
                viewListeners.destroyable = true;
                me.viewListeners = view.on(viewListeners);
                me.navigationModel = view.getNavigationModel();
                me.navigationListeners = me.navigationModel.on({
                    navigate: me.onNavigate,
                    scope: me,
                    destroyable: true
                });
            }
        }
    },

    getViewListeners: function() {
        return {
            beforerefresh: this.onBeforeViewRefresh,
            keyup: {
                element: 'el',
                fn: this.onViewKeyUp,
                scope: this
            }
        };
    },

    onViewKeyUp: function(e) {
        var sel = this.selectionData;

        // Released the shift key, terminate a keyboard based range selection
        if (e.keyCode === e.SHIFT && sel && sel.isRows && sel.getRangeSize()) {
            // Copy the drag range into the selected records collection
            sel.addRange();
        }
    },

    onColumnsChanged: function() {
        var selData = this.selectionData,
            rowRange,
            colCount,
            colIdx,
            rowIdx,
            view,
            context;

        // When columns have changed, we have to deselect *every* cell in the row range because we do not know where the
        // columns have gone to.
        if (selData && selData.isCells) {
            view = selData.view;
            context = new Ext.grid.CellContext(view);
            rowRange = selData.getRowRange();
            colCount = view.getVisibleColumnManager().getColumns().length;
            for (rowIdx = rowRange[0]; rowIdx <= rowRange[1]; rowIdx++) {
                context.setRow(rowIdx);
                for (colIdx = 0; colIdx < colCount; colIdx++) {
                    context.setColumn(colIdx);
                    view.onCellDeselect(context);
                }
            }
        }
    },

    onBeforeViewRefresh: function() {
        var selData = this.selectionData;

        if (selData && selData.isCells) {
            this.resetSelection();
        }
    },
    
    resetSelection: function(suppressEvent) {
        var sel = this.selectionData;

        if (sel) {
            sel.clear();
            if (!suppressEvent) {
                this.fireSelectionChange();
            }
        }
    },

    beforeViewRender: function(view) {
        var me = this,
            headerCt = view.headerCt,
            columnSelect, dragSelect, owner, rowSelect;

        me.callParent(arguments);

        // We need to realize our lazy configs now that we have the view...
        me.getCellSelect();
        columnSelect = me.getColumnSelect();
        rowSelect = me.getRowSelect();
        dragSelect = me.getDragSelect();

        if (columnSelect) {
            headerCt.sortOnClick = false;
        }

        // if there is no row number column and we ask for it, then it should be added here
        if (!headerCt.down('rownumberer') && rowSelect) {
            if (!me.hasLockedHeader()) {
                // Add rownumber column
                me.numbererColumn = view.headerCt.add(0, {
                    xtype: 'rownumberer',
                    width: me.rowNumbererHeaderWidth,
                    editRenderer:  '&#160;'
                });
            }
        }

        if (me.checkboxSelect) {
            // if we have a locked header, only hook up to the first
            if (!me.hasLockedHeader() || headerCt.lockedCt) {
                me.addCheckbox(view, true);
                owner = view.ownerCt;
                // Listen to the outermost reconfigure event
                if (headerCt.lockedCt) {
                    owner = owner.ownerCt;
                }
                me.mon(owner, 'reconfigure', me.onReconfigure, me);
            }
        }

        if (dragSelect) {
            view.on('render', me.onViewRender, me, {
                single: true
            });
        }
    },

    /**
     * @private
     * Plumbing for drag selection of cell range
     *
     * @param view
     * @param td
     * @param cellIndex
     * @param record
     * @param tr
     * @param rowIdx
     * @param e
     * @param eOpts
     */
    handleMouseDown: function(view, td, cellIndex, record, tr, rowIdx, e) {
        var me = this,
            sel = me.selectionData,
            header = e.position.column,
            isCheckClick,
            startDragSelect;

        // Ignore right click and shit and alt modifiers
        if (e.button || e.shiftKey || e.altKey) {
            return;
        }

        if (header) {
            Ext.getBody().on('mouseup', me.onMouseUp, me, { single: true, view: view });
            isCheckClick = header === me.checkColumn;

            // Differentiate between row and cell selections.
            if (header === me.numbererColumn || isCheckClick || !me.cellSelect) {
                // Enforce rowSelect setting
                if (me.rowSelect) {
                    if (sel && sel.isRows) {
                        if (!e.ctrlKey && !isCheckClick) {
                            sel.clear();
                        }
                    } else {
                        if (sel) {
                            sel.clear();
                        }
                        me.selectionData = new Ext.grid.selection.Rows(view);
                    }
                    startDragSelect = true;
                }
            } else {
                if (sel) {
                    sel.clear();
                }
                if (!sel || !sel.isCells) {
                    me.selectionData = new Ext.grid.selection.Cells(view);
                }
                startDragSelect = true;
            }

            me.lastOverRecord = me.lastOverColumn = null;

            // Only begin the drag process if configured to select what they asked for
            if (startDragSelect) {
                view.el.on('mousemove', me.onMouseMove, me, {view: view});
            }
        }
    },
    /**
     * @private
     * Selects range based on mouse movements
     * @param e
     * @param cell
     * @param opts
     */
    onMouseMove: function(e, target, opts) {
        var me = this,
            view = opts.view,
            record,
            rowIdx,
            cell = e.getTarget(view.cellSelector),
            header = opts.view.getHeaderByCell(cell),
            selData = me.selectionData,
            pos,
            recChange,
            colChange;

        if (header) {
            record = view.getRecord(cell.parentNode);
            rowIdx = me.store.indexOf(record);
            recChange = record !== me.lastOverRecord;
            colChange = header !== me.lastOverColumn;

             // MUST focus on where the mouse was last.
            // Otherwise, the focus
            view.getNavigationModel().setPosition(me.lastOverRecord, me.lastOverColumn);

            // Initial mousedown was in rownumberer or checkbox column
            if (selData.isRows) {
                // Only react if we've changed row
                if (recChange) {
                    if (me.lastOverRecord) {
                        selData.setRangeEnd(rowIdx);
                    } else {
                        selData.setRangeStart(rowIdx);
                    }
                }
            }
            // Selecting cells
            else {
                // Only react if we've changed row or column
                if (recChange || colChange) {
                    pos = me.getCellContext(rowIdx, header.getVisibleIndex(), view);
                    if (me.lastOverRecord) {
                        selData.setRangeEnd(pos);
                    } else {
                        selData.setRangeStart(pos);
                    }
                }
            }

            // Focus MUST follow the mouse.
            // Otherwise the focus may scroll out of the rendered range and revert to document
            if (recChange || colChange) {
                view.getNavigationModel().setPosition(record, header);
            }
            me.lastOverColumn = header;
            me.lastOverRecord = record;
        }
    },

    /**
     * @private
     * Clean up mousemove event
     * @param e
     * @param target
     * @param opts
     */
    onMouseUp: function(e, target, opts) {
        var me = this,
            view = opts.view;

        if (view && !view.isDestroyed) {
            view.el.un('mousemove', me.onMouseMove, me);

            // Copy the records encompassed by the drag range into the record collection
            if (me.selectionData.isRows) {
                me.selectionData.addRange();
            }
            me.fireSelectionChange();
        }
    },

    /**
     * @private
     * Initialize drag selection support
     */
    onViewRender: function(view) {
        var me = this,
            el = view.getEl();

        el.ddScrollConfig = {
            vthresh: 50,
            hthresh: 50,
            frequency: 300,
            increment: 100
        };
        Ext.dd.ScrollManager.register(el);
        me.scrollEl = el;

        view.on('cellmousedown', me.handleMouseDown, me);
    },

    hasLockedHeader: function() {
        var views = this.views,
            vLen = views.length,
            v;

        for (v = 0; v < vLen; v++) {
            if (views[v].headerCt.lockedCt) {
                return true;
            }
        }
        return false;
    },

    /**
     * Add the header checkbox to the header row
     * @private
     * @param view
     * @param {Boolean} initial True if we're binding for the first time.
     */
    addCheckbox: function(view, initial) {
        var me = this,
            checkbox = me.checkboxColumnIndex,
            headerCt = view.headerCt;

        // Preserve behaviour of false, but not clear why that would ever be done.
        if (checkbox !== false) {
            if (checkbox === 'first') {
                checkbox = 0;
            } else if (checkbox === 'last') {
                checkbox = headerCt.getColumnCount();
            }
            Ext.suspendLayouts();
            if (view.getStore().isBufferedStore) {
                me.showHeaderCheckbox = false;
            }
            me.checkColumn = headerCt.add(checkbox, me.getHeaderConfig());
            Ext.resumeLayouts();
        }

        if (initial !== true) {
            view.refresh();
        }
    },

    /**
     * Retrieve a configuration to be used in a HeaderContainer.
     * This should be used when checkboxSelect is set to false.
     */
    getHeaderConfig: function() {
        var me = this,
            showCheck = me.showHeaderCheckbox !== false;

        return {
            isCheckerHd: showCheck,
            text : '&#160;',
            clickTargetName: 'el',
            width: me.checkboxHeaderWidth,
            sortable: false,
            draggable: false,
            resizable: false,
            hideable: false,
            menuDisabled: true,
            dataIndex: '',
            tdCls: me.tdCls,
            cls: showCheck ? Ext.baseCSSPrefix + 'column-header-checkbox ' : '',
            defaultRenderer: me.checkboxRenderer.bind(me),
            editRenderer:  '&#160;',
            locked: me.hasLockedHeader()
        };
    },

    /**
     * Generates the HTML to be rendered in the injected checkbox column for each row.
     * Creates the standard checkbox markup by default; can be overridden to provide custom rendering.
     * See {@link Ext.grid.column.Column#renderer} for description of allowed parameters.
     */
    checkboxRenderer: function () {
        return '<div class="' + Ext.baseCSSPrefix + 'grid-row-checker" role="presentation">&#160;</div>';
    },

    /**
     * Toggle between selecting all and deselecting all when clicking on
     * a rownumberer or checkbox header.
     */
    onHeaderClick: function(headerCt, header, e) {
        var me = this,
            sel = me.selectionData;

        if (header === me.numbererColumn || header === me.checkColumn) {
            e.stopEvent();
            // No selection, select all
            if (!sel || !sel.getCount()) {
                me.selectAll(headerCt.view);
            } else {
                me.deselectAll();
            }
            me.updateHeaderState();
        } else if (me.columnSelect) {
            me.selectColumn(header, headerCt.view, e.ctrlKey);
        }
    },

    /**
     * @private
     */
    updateHeaderState: function() {
        // check to see if all records are selected
        var me = this,
            store = me.view.dataSource,
            storeCount = store.getCount(),
            views = me.views,
            sel = me.selectionData,
            isChecked = sel && sel.isRows && !store.isBufferedStore && storeCount > 0 && (storeCount === sel.getCount()),
            checkHd  = me.checkColumn,
            cls = me.checkerOnCls;

        if (views && views.length) {
            if (checkHd) {
                if (isChecked) {
                    checkHd.addCls(cls);
                } else {
                    checkHd.removeCls(cls);
                }
            }
        }
    },

    /**
     * Handles the grid's reconfigure event.  Adds the checkbox header if the columns have been reconfigured.
     * @param {Ext.panel.Table} grid
     * @param {Ext.data.Store} store
     * @param {Object[]} columns
     * @private
     */
    onReconfigure: function(grid, store, columns) {
        if (columns) {
            this.addCheckbox(this.views[0]);
        }
    },

    /**
     * This is helper method to retrieve cell context
     *
     * It will contain the following properties:
     *  colIdx - column index
     *  rowIdx - row index
     *  column - {@link Ext.grid.column.Column Column} under which the cell is located.
     *  record - {@link Ext.data.Model} Record from which the cell derives its data.
     *  view - current view, where this cell belongs
     *
     * @param {Number} rowIdx Row index
     * @param {Number} colIdx Column index
     * @param {Ext.view.Table} [view] Target view where cell is located, if not specified, model will pick up its current view.
     * This is only necessary when using a locking grid in which there are two views.
     * @returns {Ext.grid.CellContext} A context object describing the cell. Note that the `rowidx` and `colIdx` properties are only valid
     * at the time the context object is created. Column movement, sorting or filtering might changed where the cell is.
     * @private
     */
    getCellContext: function(rowIdx, colIdx, view) {
        return new Ext.grid.CellContext(view || this.view).setPosition(rowIdx, colIdx);
    },

    /**
     * @inheritdoc
     */
    select: function(records, keepExisting, suppressEvent) {
        var me = this,
            sel = me.selectionData,
            view = me.view,
            store = view.dataSource,
            len,
            i,
            record,
            changed = false;

        // Ensure selection object is of the correct type
        if (!sel || !sel.isRows || sel.view !== view) {
            me.resetSelection(true);
            sel = me.selectionData = new Ext.grid.selection.Rows(view);
        } else if (!keepExisting) {
            sel.clear();
        }
        
        if (!Ext.isArray(records)) {
            records = [records];
        }
        len = records.length;
        for (i = 0; i < len; i++) {
            record = records[i];
            if (typeof record === 'number') {
                record = store.getAt(record);
            }
            if (!sel.contains(record)) {
                sel.add(record);
                changed = true;
            }
        }
        if (changed) {
            me.updateHeaderState();
            if (suppressEvent) {
                me.fireSelectionChange();
            }
        }
    },

    /**
     * @inheritdoc
     */
    deselect: function(records, suppressEvent) {
        var me = this,
            sel = me.selectionData,
            store = me.view.dataSource,
            len,
            i,
            record,
            changed = false;

        if (sel && sel.isRows) {
            if (!Ext.isArray(records)) {
                records = [records];
            }
            len = records.length;
            for (i = 0; i < len; i++) {
                record = records[i];
                if (typeof record === 'number') {
                    record = store.getAt(record);
                }
                changed = changed || sel.remove(record);
            }
        }
        if (changed) {
            me.updateHeaderState();
            if (!suppressEvent) {
                me.fireSelectionChange();
            }
        }
    },

    /**
     * This method allows programmatic selection of the cell range
     *
     *     @example
     *     var store = Ext.create('Ext.data.Store', {
     *         fields  : ['name', 'email', 'phone'],
     *         data    : {
     *             items : [
     *                 { name : 'Lisa',  email : 'lisa@simpsons.com',  phone : '555-111-1224' },
     *                 { name : 'Bart',  email : 'bart@simpsons.com',  phone : '555-222-1234' },
     *                 { name : 'Homer', email : 'homer@simpsons.com', phone : '555-222-1244' },
     *                 { name : 'Marge', email : 'marge@simpsons.com', phone : '555-222-1254' }
     *             ]
     *         },
     *         proxy   : {
     *             type   : 'memory',
     *             reader : {
     *                 type : 'json',
     *                 root : 'items'
     *             }
     *         }
     *     });
     *
     *     vaar grid = Ext.create('Ext.grid.Panel', {
     *         title    : 'Simpsons',
     *         store    : store,
     *         width    : 400,
     *         renderTo : Ext.getBody(),
     *         columns  : [
     *            columns: [
     *               { text: 'Name',  dataIndex: 'name' },
     *               { text: 'Email', dataIndex: 'email', flex: 1 },
     *               { text: 'Phone', dataIndex: 'phone', width:120 },
     *               {
     *                   text:'Combined', dataIndex: 'name', width : 300,
     *                   renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
     *                       console.log(arguments);
     *                       return value + ' has email: ' + record.get('email');
     *                   }
     *               }
     *           ],
     *         ],
     *         selType: 'spreadsheet'
     *     });
     *
     *     var model = grid.getSelectionModel();  // get selection model
     *
     *     // We will create range of 4 cells.
     *
     *     // Range start in this case is top left corner that represents coordinate 0,0
     *     var rangeStart = model.getCellContext(0, 0);
     *
     *     // Range end is 1 cell apart in both vertical and hirizontal directions. It represents the right bottom corner and thus have coordinate 1,1
     *     var rangeEnd = model.getCellContext(1, 1);
     *
     *     // Now set the range  and prevent rangeselect event from being fired
     *     model.selectRange(rangeStart, rangeEnd, true);
     *
     * @param rangeStart {Ext.grid.CellContext | Object} Range starting position. Can be either Cell context or object specifying at least row, column and the view
     * @param rangeEnd {Ext.grid.CellContext | Object} Range end position. Can be either Cell context or object specifying at least row, column and the view
     * @param suppressEvent set to true to surpress rangeselect event
     */
    selectRange: function(rangeStart, rangeEnd, suppressEvent) {
        var me = this,
            sel;

        rangeStart = rangeStart.isCellContext ? rangeStart.clone() : new Ext.grid.CellContext(rangeStart.view || me.view).setPosition(rangeStart);
        rangeEnd = rangeEnd.isCellContext ? rangeEnd.clone() : new Ext.grid.CellContext(rangeEnd.view || me.view).setPosition(rangeEnd);

        me.resetSelection(true);

        me.selectionData = sel = new Ext.grid.selection.Cells(rangeStart.view);
        sel.setRangeStart(rangeStart);
        sel.setRangeEnd(rangeEnd);

        if (!suppressEvent) {
            me.fireSelectionChange();
        }
    },

    /**
     * Select All the data if possible.
     *
     * If {@link #rowSelect} is `true`, then all *records* will be selected.
     *
     * If {@link #cellSelect} is `true`, then all *rendered cells* will be selected.
     *
     * If {@link #columnSelect} is `true`, then all *columns* will be selected.
     *
     * @param suppressEvent
     * @returns {boolean}
     */
    selectAll: function(view, suppressEvent) {
        var me = this,
            sel = me.selectionData,
            doSelect;

        if (me.rowSelect) {
            if (!sel || !sel.isRows || sel.view !== view) {
                me.resetSelection(true);
                me.selectionData = sel = new Ext.grid.selection.Rows(view);
            }
            doSelect = true;
        }
        else if (me.cellSelect) {
            if (!sel || !sel.isCells || sel.view !== view) {
                me.resetSelection(true);
                me.selectionData = sel = new Ext.grid.selection.Cells(view);
            }
            doSelect = true;
        }
        else if (me.columnSelect) {
            if (!sel || !sel.isColumns || sel.view !== view) {
                me.resetSelection(true);
                me.selectionData = sel = new Ext.grid.selection.Columns(view);
            }
            doSelect = true;
        }

        if (doSelect) {
            sel.selectAll();
            me.updateHeaderState();
            if (!suppressEvent) {
                me.fireSelectionChange();
            }
        }
    },

    /**
     * Clears selection and optionally surpress selectionchange event
     * @param suppressEvent
     */
    deselectAll: function(suppressEvent) {
        var sel = this.selectionData;
        
        if (sel && sel.getCount()) {
            sel.clear();
            if (!suppressEvent) {
                this.fireSelectionChange();
            }
        }
    },

    /**
     * Select one or more rows
     * @param rows {Ext.data.Model[]} Records to select
     * @param preserveSelection {Boolean} keep previous selection
     * @param suppressEvent {Boolean}
     */
    selectRows: function(rows, preserveSelection, suppressEvent) {
        var me = this,
            sel = me.selectionData,
            isSelectingRows = sel && !sel.isRows,
            len = rows.length,
            i;

        if (!preserveSelection || isSelectingRows) {
            me.resetSelection(true);
        }
        if (!isSelectingRows) {
            me.selectionData = sel = new Ext.grid.selection.Rows(me.view);
        }

        for (i = 0; i < len; i++) {
            sel.add(rows[i]);
        }

        if (!suppressEvent) {
            me.fireSelectionChange();
        }
    },

    /**
     * @private
     * @param e
     */
    onNavigate: function(e) {
        var me = this,
            view = e.view,
            record = e.record,
            sel = me.selectionData,
            pos = e.position,
            keyEvent = e.keyEvent,
            keyCode = keyEvent.getKey(),
            selectionChanged;

        // CTRL/Arrow just navigates, does not select
        if (keyEvent.ctrlKey && (keyCode === keyEvent.UP || keyCode === keyEvent.LEFT || keyCode === keyEvent.RIGHT || keyCode === keyEvent.DOWN)) {
            return;
        }

        // If all selection types are disabled, or it's not a selecting event, return
        if (!(me.cellSelect || me.columnSelect || me.rowSelect) || !e.record || keyEvent.type === 'mousedown') {
            return;
        }

        // Ctrl/A key - Deselect current selection, or select all if no selection
        if (keyEvent.ctrlKey && keyEvent.keyCode === keyEvent.A ) {
            // No selection, or only one, select all
            if (!sel || sel.getCount() < 2) {
                me.selectAll(view);
            } else {
                me.deselectAll();
            }
            me.updateHeaderState();
            return;
        }

        if (keyEvent.shiftKey) {
            // If the event is in one of the row selecting cells, or cell selecting is turned off
            if (pos.column === me.numbererColumn || pos.column === me.checkColumn || !me.cellSelect) {
                if (me.rowSelect) {
                    // Ensure selection object is of the correct type
                    if (!sel || !sel.isRows || sel.view !== view) {
                        me.resetSelection(true);
                        sel = me.selectionData = new Ext.grid.selection.Rows(view);
                    }
                    // First shift
                    if (!sel.getRangeSize()) {
                        sel.setRangeStart(e.previousRecordIndex || 0);
                    }
                    sel.setRangeEnd(e.recordIndex);
                    selectionChanged = true;
                }
            }
            // Navigate event in a normal cell
            else {
                if (me.cellSelect) {
                    // Ensure selection object is of the correct type
                    if (!sel || !sel.isCells || sel.view !== view) {
                        me.resetSelection(true);
                        sel = me.selectionData = new Ext.grid.selection.Cells(view);
                    }
                    // First shift
                    if (!sel.getRangeSize()) {
                        sel.setRangeStart(e.previousPosition || me.getCellContext(0, 0, view));
                    }
                    sel.setRangeEnd(pos);
                    selectionChanged = true;
                }
            }
        } else {
            // If the event is in one of the row selecting cells, or cell selecting is turned off
            if (pos.column === me.numbererColumn || pos.column === me.checkColumn || !me.cellSelect) {
                if (me.rowSelect) {
                    // Ensure selection object is of the correct type
                    if (!sel || !sel.isRows || sel.view !== view) {
                        me.resetSelection(true);
                        sel = me.selectionData = new Ext.grid.selection.Rows(view);
                    }

                    if (keyEvent.ctrlKey ||  pos.column === me.checkColumn) {
                        if (sel.contains(record)) {
                            sel.remove(record);
                        } else {
                            sel.add(record);
                        }
                    } else {
                        sel.clear();
                        sel.add(record);
                    }
                    selectionChanged = true;
                }
            }
            // Navigate event in a normal cell
            else {
                if (me.cellSelect) {
                    // Ensure selection object is of the correct type
                    if (!sel || !sel.isCells || sel.view !== view) {
                        me.resetSelection(true);
                        me.selectionData = sel = new Ext.grid.selection.Cells(view);
                    } else {
                        sel.clear();
                    }
                    sel.setRangeStart(pos);
                    selectionChanged = true;
                }
            }
        }

        // If our configuration allowed selection changes, update check header and fire event
        if (selectionChanged) {
            if (sel.isRows) {
                me.updateHeaderState();
            }
            me.fireSelectionChange();
        }
    },

    isSelected: function(record) {
        return this.isRowSelected(record);
    },

    /**
     * Check if given record is currently selected
     * @param record
     * @returns {boolean}
     */
    isRowSelected: function(record) {
        var me = this,
            sel = me.selectionData;

        if (sel && sel.isRows) {
            record = Ext.isNumber(record) ? me.store.getAt(record) : record;
            return sel.contains(record);
        } else {
            return false;
        }
    },

    /**
     * Returns true if specified cell within specified view is selected
     * @param {Ext.grid.View} view - impactful when locked columns are used
     * @param {Integer} row - row index
     * @param {Integer} column - column index, within the current view
     *
     * @returns {boolean}
     */
    isCellSelected: function(view, row, column) {
        var me = this,
            testPos,
            sel = me.selectionData;

        if (sel) {
            if (sel.isColumns) {
                if (typeof column === 'number') {
                    column = view.getVisibleColumnManager().getColumns()[column];
                }
                return sel.contains(column);
            }

            if (sel.isCells) {
                testPos = new Ext.grid.CellContext(view).setPosition({
                    row: row,
                    // IMPORTANT: The historic API for columns has been to include hidden columns
                    // in the index. So we must index into the "all" ColumnManager.
                    column: column
                });

                return sel.contains(testPos);
            }
        }

        return false;
    },

    /**
     * Select column
     * @param {Ext.grid.column.Column} column
     * @param {Ext.view.Table} view
     * @param {Boolean} isCtrlKey
     */
    selectColumn: function(column, view, isCtrlKey) {
        var me = this,
            selData = me.selectionData,
            isSelected;

        // Clear other selection types
        if (!selData || !selData.isColumns || selData.view !== view) {
            me.resetSelection(true);
            me.selectionData = selData = new Ext.grid.selection.Columns(view);
        }

        isSelected = selData.contains(column);
        if (!isCtrlKey) {
            selData.clear();
        }
        if (isSelected) {
            selData.remove(column);
        } else {
            selData.add(column);
        }

        me.updateHeaderState();
        me.fireSelectionChange();
    },

    /**
     * Returns a subclass of {@link Ext.grid.selection.Selection} describing the current
     * selection.
     * @returns {Ext.grid.selection.Selection} The current selection.
     */
    getSelectionData: function() {
        return this.selectionData;
    },

    /**
     * @inheritdoc
     */
    getSelection: function() {
        var selData = this.selectionData;

        if (selData && selData.isRows) {
            return selData.getSelected();
        }
        return [];
    },

    destroy: function() {
        var me = this,
            scrollEl = me.scrollEl;

        Ext.destroy(me.gridListeners, me.viewListeners, me.selectionData, me.navigationListeners);
        if (scrollEl) {
            Ext.dd.ScrollManager.unregister(scrollEl);
        }
        me.gridListeners = me.viewListeners = me.selectionData = me.navigationListeners = me.scrollEl = null;
        me.callParent();
    },

    //-------------------------------------------------------------------------

    privates: {
        fireSelectionChange: function () {
            var grid = this.view.ownerGrid;
            grid.fireEvent('selectionchange', grid, this.selectionData);
        },

        /**
         * @private
         * @override
         */
        onIdChanged: function(store, rec, oldId, newId) {
            var sel = this.selectionData;

            if (sel && sel.isRows && sel.selectedRecords) {
                sel.selectedRecords.updateKey(rec, oldId);
            }
        },

        // Page added to BufferedStore.
        // Check for return of already selected records
        onPageAdd: function(pageMap, pageNumber, records) {
            var sel = this.selectionData,
                len = records.length,
                i,
                record,
                selected = sel.selectedRecords;

            if (sel && sel.isRows && selected) {
                for (i = 0; i < len; i++) {
                    record = records[i];
                    if (selected.get(record.id)) {
                        selected.replace(record);
                    }
                }
            }
        },

        /**
         * @private
         * @override
         */
        onStoreAdd: function() {
            this.callParent(arguments);
            this.updateHeaderState();
        },

        /**
         * @private
         * @override
         */
        onStoreClear: function() {
            this.resetSelection();
        },

        /**
         * @private
         * @override
         */
        onStoreLoad: function() {
            this.callParent(arguments);
            this.updateHeaderState();
        },

        /**
         * @private
         * @override
         */
        onStoreRefresh: function() {
            var sel = this.selectionData;

            // Ensure that records which are no longer in the new store are pruned if configured to do so.
            // Ensure that selected records in the collection are the correct instance.
            if (sel && sel.isRows && sel.selectedRecords) {
                this.updateSelectedInstances(sel.selectedRecords);
            }
            this.updateHeaderState();
        },

        /**
         * @private
         * @override
         */
        onStoreRemove: function() {
            // Superclass calls deselect
            this.callParent(arguments);
        }
    }
});
