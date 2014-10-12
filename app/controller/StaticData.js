Ext.define('Packt.controller.StaticData', {
    extend: 'Ext.app.Controller',

    requires: [
        'Packt.util.Util',
        'Packt.util.Glyphs'
    ],

    stores: [
        'staticData.Actors',
        'staticData.Categories',
        'staticData.Cities',
        'staticData.Countries',
        'staticData.Languages'
    ],

    views: [
        'staticData.BaseGrid',
        'staticData.Actors',
        'staticData.Categories',
        'staticData.Cities',
        'staticData.Countries',
        'staticData.Languages'
    ],

    init: function(application) {

        var me = this;

        me.control({
            'staticdatagrid': {
                render: me.render,
                edit: me.onEdit,
                afterrender: me.onAfterRender
            },
            'staticdatagrid button#add': {
                click: me.onButtonClickAdd
            },
            'staticdatagrid button#save': {
                click: me.onButtonClickSave
            },
            'staticdatagrid button#cancel': {
                click: me.onButtonClickCancel
            },
            'staticdatagrid button#clearFilter': {
                click: me.onButtonClickClearFilter
            },
            'staticdatagrid button#delete': {
                click: me.onButtonClickDelete
            },
            'citiesgrid button#clearGrouping': {
                toggle: me.onButtonToggleClearGrouping
            }
        });

        me.listen({
            store: {
                '#staticDataAbstract': {
                    write: me.onStoreSync
                }
            }
        });
    },

    onStoreSync: function(store, operation, options){
        Packt.util.Alert.msg('Success!', 'Your changes have been saved.');
        console.log(store);
        console.log(operation);
        console.log(options);
    },

    render: function(component, options) {
        component.getStore().load();

        if (component.xtype === 'citiesgrid' && component.features.length > 0){
            if (component.features[0].ftype === 'grouping'){
                component.down('toolbar#topToolbar').add([
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        itemId: 'clearGrouping',
                        text: 'Group by Country: ON',
                        glyph: Packt.util.Glyphs.getGlyph('groupCountry'),
                        enableToggle: true,
                        pressed: true
                    }
                ]);
            }
        }
    },

    onEdit: function(editor, context, options) {
        context.record.set('last_update', new Date());
    },

    onButtonClickAdd: function (button, e, options) {
        var grid = button.up('staticdatagrid'),
            store = grid.getStore(),
            modelName = store.getModel().getName(),
            cellEditing = grid.getPlugin('cellplugin');

        store.insert(0, Ext.create(modelName, {
            last_update: new Date()
        }));

        cellEditing.startEditByPosition({row: 0, column: 1});
    },

    onButtonClickSave: function (button, e, options) {
        button.up('staticdatagrid').getStore().sync();
    },

    onButtonClickCancel: function (button, e, options) {
        button.up('staticdatagrid').getStore().reload();
    },

    onButtonClickClearFilter: function (button, e, options) {
        button.up('staticdatagrid').filters.clearFilters();
    },

    onButtonClickDelete: function(button) {

        console.log(button);

       /* var store = view.up('staticdatagrid').getStore(),
            rec = store.getAt(rowIndex);

        if (action == 'delete'){
            store.remove(rec);
            Ext.Msg.alert('Delete', 'Save the changes to persist the removed record.');
        }*/
    },

    onButtonToggleClearGrouping: function (button, pressed, options) {

        var store = button.up('citiesgrid').getStore();

        if (pressed){
            button.setText('Group by Country: ON');
            store.group('country_id');
        } else {
            button.setText('Group by Country: OFF');
            store.clearGrouping();
        }
    },

    onAfterRender: function(grid, options){

        var view = grid.getView();
        var me = this;
        view.on('itemupdate', function (record, index, node, options) {
            me.validateRow(grid, record, index, node, options);
        });
    },

    validateRow: function(grid, record, index, node, options){

        var me, view, errors, columns;

        me = this;
        view = grid.getView();

        errors = record.validate();
        if (errors.isValid()) {
            console.log('true');
            return true;
        }

        var columnIndexes = me.getColumnIndexes(grid.columns);

        Ext.each(columnIndexes, function (columnIndex, x) {
            var cellErrors, cell, messages;

            cellErrors = errors.getByField(columnIndex);
            if (!Ext.isEmpty(cellErrors)) {
                cell = view.getCellByPosition({row: index, column: x});
                messages = [];
                Ext.each(cellErrors, function (cellError) {
                    messages.push(cellError.message);
                });

                cell.addCls("invalidCell");
                // set error tooltip attribute
                cell.set({'data-errorqtip': Ext.String.format('<ul><li class="last">{0}</li></ul>', messages.join('<br/>'))});
            }
        });

        console.log('false');

        return false;
    },

    getColumnIndexes: function (columns) {
        var me, columnIndexes;

        me = this;
        columnIndexes = [];

        Ext.Array.each(columns, function (column) {

            // only validate column with editor
            if (Ext.isDefined(column.getEditor())) {
                columnIndexes.push(column.dataIndex);
            } else {
                columnIndexes.push(undefined);
            }
        });


        return columnIndexes;
    }
});