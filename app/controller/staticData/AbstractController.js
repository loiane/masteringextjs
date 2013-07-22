Ext.define('Packt.controller.staticData.AbstractController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Packt.util.Util'
    ],

    stores: [
        'staticData.Actors',
        'staticData.Categories',
        'staticData.Cities',
        'staticData.Countries',
        'staticData.Languages'
    ],

    views: [
        'staticData.AbstractGrid',
        'staticData.Actors',
        'staticData.Categories',
        'staticData.Cities',
        'staticData.Countries',
        'staticData.Languages'
    ],

    init: function(application) {
        this.control({
            "staticdatagrid": {
                render: this.render,
                edit: this.onEdit
            },
            "staticdatagrid button[itemId=add]": {
                click: this.onButtonClickAdd
            },
            "staticdatagrid button[itemId=save]": {
                click: this.onButtonClickSave
            },
            "staticdatagrid button[itemId=cancel]": {
                click: this.onButtonClickCancel
            },
            "staticdatagrid button[itemId=clearFilter]": {
                click: this.onButtonClickClearFilter
            },
            "staticdatagrid actioncolumn": {
                itemclick: this.handleActionColumn
            },
            "citiesgrid button[itemId=clearGrouping]": {
                toggle: this.onButtonToggleClearGrouping
            }
        });

        this.listen({
            store: {
                '#staticDataAbstract': {
                    write: this.onStoreSync
                }
            }
        });

        if (!Ext.getStore('countries')) {
            Ext.create('Packt.store.staticData.Countries');
        }

        if (!Ext.getStore('languages')) {
            Ext.create('Packt.store.staticData.Languages').load();
        }

        if (!Ext.getStore('actors')) {
            Ext.create('Packt.store.staticData.Actors');
        }

        if (!Ext.getStore('categories')) {
            Ext.create('Packt.store.staticData.Categories');
        }
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
                        iconCls: 'grouping',
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
    	modelName = store.getProxy().getModel().modelName,
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

    handleActionColumn: function(column, action, view, rowIndex, colIndex, item, e) {
        var store = view.up('staticdatagrid').getStore(),
        rec = store.getAt(rowIndex);

        if (action == 'delete'){
            store.remove(rec);
            Ext.Msg.alert('Delete', 'Save the changes to persist the removed record.');
        }   
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
    }
});