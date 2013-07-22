/** */
Ext.define('Ext.ux.CellDragDrop', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.celldragdrop',

    uses: ['Ext.view.DragZone'],

    // *************************************************

    // Will only allow drops of the same type.
    enforceType: false,

    // If applyEmptyText is `true`, then use the value of emptyText to replace the drag record's value after a node drop.
    // Note that if dropped on a cell of a differnt type it will convert the default text according to its own conversion rules.
    applyEmptyText: false,
    emptyText: '',

    // The default background colors of the targeted node when entering node.
    dropBackgroundColor: 'green',
    noDropBackgroundColor: 'red',

    // **************************************************

    dragText: '{0} selected row{1}',
    ddGroup: "GridDD",

    enableDrop: true,

    enableDrag: true,

    containerScroll: false,

    init: function (view) {
        var me = this;

        view.on('render', me.onViewRender, me, {
            single: true
        });
    },

    destroy: function () {
        var me = this;

        Ext.destroy(me.dragZone, me.dropZone);
    },

    enable: function () {
        var me = this;

        if (me.dragZone) {
            me.dragZone.unlock();
        }
        if (me.dropZone) {
            me.dropZone.unlock();
        }
        me.callParent();
    },

    disable: function () {
        var me = this;

        if (me.dragZone) {
            me.dragZone.lock();
        }
        if (me.dropZone) {
            me.dropZone.lock();
        }
        me.callParent();
    },

    onViewRender: function (view) {
        var me = this,
            scrollEl;

        if (me.enableDrag) {
            if (me.containerScroll) {
                scrollEl = view.getEl();
            }

            me.dragZone = new Ext.view.DragZone({
                view: view,
                ddGroup: me.dragGroup || me.ddGroup,
                dragText: me.dragText,
                containerScroll: me.containerScroll,
                scrollEl: scrollEl,
                getDragData: function (e) {
                    var view = this.view,
                        item = e.getTarget(view.getItemSelector()),
                        record = view.getRecord(item),
                        clickedEl = e.getTarget(view.getCellSelector()),
                        dragEl;

                    if (item) {
                        dragEl = document.createElement('div');
                        dragEl.className = 'x-form-text';
                        dragEl.appendChild(document.createTextNode(clickedEl.textContent || clickedEl.innerText));

                        return {
                            event: new Ext.EventObjectImpl(e),
                            ddel: dragEl,
                            item: e.target,
                            columnName: view.getGridColumns()[clickedEl.cellIndex].dataIndex,
                            record: record
                        };
                    }
                },

                onInitDrag: function (x, y) {
                    var self = this,
                        data = self.dragData,
                        view = self.view,
                        selectionModel = view.getSelectionModel(),
                        record = data.record,
                        el = data.ddel;

                    // Update the selection to match what would have been selected if the user had
                    // done a full click on the target node rather than starting a drag from it.
                    if (!selectionModel.isSelected(record)) {
                        selectionModel.select(record, true);
                    }

                    self.ddel.update(el.textContent || el.innerText);
                    self.proxy.update(self.ddel.dom);
                    self.onStartDrag(x, y);
                    return true;
                }
            });
        }

        if (me.enableDrop) {
            me.dropZone = new Ext.dd.DropZone(view.el, {
                view: view,
                ddGroup: me.dropGroup || me.ddGroup,
                containerScroll: true,

                getTargetFromEvent: function (e) {
                    var self = this,
                        v = self.view,
                        cell = e.getTarget(v.cellSelector),
                        row, columnIndex;

                    // Ascertain whether the mousemove is within a grid cell.
                    if (cell) {
                        row = v.findItemByChild(cell);
                        columnIndex = cell.cellIndex;

                        if (row && Ext.isDefined(columnIndex)) {
                            return {
                                node: cell,
                                record: v.getRecord(row),
                                columnName: self.view.up('grid').columns[columnIndex].dataIndex
                            };
                        }
                    }
                },

                // On Node enter, see if it is valid for us to drop the field on that type of column.
                onNodeEnter: function (target, dd, e, dragData) {
                    var self = this,
                        destType = target.record.fields.get(target.columnName).type.type.toUpperCase(),
                        sourceType = dragData.record.fields.get(dragData.columnName).type.type.toUpperCase();

                    delete self.dropOK;

                    // Return if no target node or if over the same cell as the source of the drag.
                    if (!target || target.node === dragData.item.parentNode) {
                        return;
                    }

                    // Check whether the data type of the column being dropped on accepts the
                    // dragged field type. If so, set dropOK flag, and highlight the target node.
                    if (me.enforceType && destType !== sourceType) {

                        self.dropOK = false;

                        if (me.noDropCls) {
                            Ext.fly(target.node).addCls(me.noDropCls);
                        } else {
                            Ext.fly(target.node).applyStyles({
                                backgroundColor: me.noDropBackgroundColor
                            });
                        }

                        return;
                    }

                    self.dropOK = true;

                    if (me.dropCls) {
                        Ext.fly(target.node).addCls(me.dropCls);
                    } else {
                        Ext.fly(target.node).applyStyles({
                            backgroundColor: me.dropBackgroundColor
                        });
                    }
                },

                // Return the class name to add to the drag proxy. This provides a visual indication
                // of drop allowed or not allowed.
                onNodeOver: function (target, dd, e, dragData) {
                    return this.dropOK ? this.dropAllowed : this.dropNotAllowed;
                },

                // Highlight the target node.
                onNodeOut: function (target, dd, e, dragData) {
                    var cls = this.dropOK ? me.dropCls : me.noDropCls;

                    if (cls) {
                        Ext.fly(target.node).removeCls(cls);
                    } else {
                        Ext.fly(target.node).applyStyles({
                            backgroundColor: ''
                        });
                    }
                },

                // Process the drop event if we have previously ascertained that a drop is OK.
                onNodeDrop: function (target, dd, e, dragData) {
                    if (this.dropOK) {
                        target.record.set(target.columnName, dragData.record.get(dragData.columnName));
                        if (me.applyEmptyText) {
                            dragData.record.set(dragData.columnName, me.emptyText);
                        }
                        return true;
                    }
                },

                onCellDrop: Ext.emptyFn
            });
        }
    }
});
