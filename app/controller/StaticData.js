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
                afterrender: me.onAfterRender,
                widgetclick: me.onWidgetClick
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
            'citiesgrid button#clearGrouping': {
                toggle: me.onButtonToggleClearGrouping
            }
        });

        me.listen({
            store: {
                '#staticData.Base': {
                    write: me.onStoreSync
                }
            }
        });
    },

    onStoreSync: function(store, operation, options){
        Packt.util.Util.showToast('Success! Your changes have been saved.');
    },

    render: function(component, options) {
        //component.getStore().load();

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
        var grid = button.up('staticdatagrid'),
            store = grid.getStore(),
            errors = grid.validate();

        if (errors === undefined){
            store.sync();
        } else {
            Ext.Msg.alert(errors);
        }
    },

    onButtonClickCancel: function (button, e, options) {
        button.up('staticdatagrid').getStore().reload();
    },

    onButtonClickClearFilter: function (button, e, options) {
        button.up('staticdatagrid').filters.clearFilters();
    },


    onWidgetClick: function(grid, button){

        var store = grid.getStore(),
            rec = button.getWidgetRecord();

        store.remove(rec);
        Ext.Msg.alert('Delete', 'Save the changes to persist the removed record.');
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
        view.on('itemupdate', function (record, index, node, options) {
            grid.validateRow(record, index, node, options);
        });
    }
});