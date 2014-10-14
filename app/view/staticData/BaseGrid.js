Ext.define('Packt.view.staticData.BaseGrid', {
    extend: 'Ext.ux.LiveSearchGridPanel',
    xtype: 'staticdatagrid',

    requires: [
        'Packt.util.Glyphs',
        'Packt.overrides.grid.column.Action'
    ],

    columnLines: true,
    viewConfig: {
        stripeRows: true
    },

    initComponent: function() {
        var me = this;

        me.selModel = {
            selType: 'cellmodel'
        };

        me.plugins = [
            {
                ptype: 'cellediting',
                clicksToEdit: 1,
                pluginId: 'cellplugin'
            },
            {
                ptype: 'gridfilters'
            }
        ];

        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                itemId: 'topToolbar',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'add',
                        text: 'Add',
                        glyph: Packt.util.Glyphs.getGlyph('add')
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        itemId: 'save',
                        text: 'Save Changes',
                        glyph: Packt.util.Glyphs.getGlyph('saveAll')
                    },
                    {
                        xtype: 'button',
                        itemId: 'cancel',
                        text: 'Cancel Changes',
                        glyph: Packt.util.Glyphs.getGlyph('cancel')
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        itemId: 'clearFilter',
                        text: 'Clear Filters',
                        glyph: Packt.util.Glyphs.getGlyph('clearFilter')
                    }
                ]
            }
        ];

        me.columns = Ext.Array.merge(
            me.columns,
            [
                {
                    xtype: 'datecolumn',
                    text: 'Last Update',
                    width: 150,
                    dataIndex: 'last_update',
                    format: 'Y-m-j H:i:s',
                    filter: true
                },
                {
                    xtype: 'widgetcolumn',
                    width: 50,
                    sortable: false,
                    menuDisabled: true,
                    widget: {
                        xtype: 'button',
                        glyph: Packt.util.Glyphs.getGlyph('destroy'),
                        tooltip: 'Delete',
                        scope: me,
                        handler: function (btn) {
                            me.fireEvent('widgetclick', me, btn);
                        }
                    }
                }
            ]
        );

        me.getColumnIndexes = function() {
            var me = this,
                columnIndexes = [];

            Ext.Array.each(me.columns, function (column) {
                // only validate column with editor
                if (Ext.isDefined(column.getEditor())) {
                    columnIndexes.push(column.dataIndex);
                } else {
                    columnIndexes.push(undefined);
                }
            });

            return columnIndexes;
        };

        me.validateRow = function(record, rowIndex){

            var me = this,
                view = me.getView(),
                errors = record.validate();

            if (errors.isValid()) {
                return true;
            }

            var columnIndexes = me.getColumnIndexes();

            Ext.each(columnIndexes, function (columnIndex, col) {
                var cellErrors, cell, messages;

                cellErrors = errors.getByField(columnIndex);
                if (!Ext.isEmpty(cellErrors)) {
                    cell = view.getCellByPosition({row: rowIndex, column: col});
                    messages = [];
                    Ext.each(cellErrors, function (cellError) {
                        messages.push(cellError.message);
                    });

                    cell.addCls('x-form-error-msg x-form-invalid-icon x-form-invalid-icon-default');
                    // set error tooltip attribute
                    cell.set({
                        'data-errorqtip': Ext.String.format('<ul><li class="last">{0}</li></ul>',
                            messages.join('<br/>'))
                    });
                }
            });

            return false;
        };

        me.validate = function(){

            var me = this,
                isValid = true,
                view = me.getView(),
                error,
                record;

            Ext.each(view.getNodes(), function (row, col) {
                record = view.getRecord(row);

                isValid = (me.validateRow(record, col) && isValid);
            });

            error = isValid ? undefined : {
                title: "Invalid Records",
                message: "Please fix errors before saving."
            };

            return error;
        };

        me.callParent(arguments);
    }
});