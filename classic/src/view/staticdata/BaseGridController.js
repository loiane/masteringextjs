Ext.define('MasteringExtJS.view.staticdata.BaseGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basegrid',

    /**
     * Called when the view is created
     */
    init: function() {

    },

    onEdit: function(editor, context, options) {
        context.record.set('lastUpdate', new Date());
    },

    onButtonClickAdd: function (button, e, options) {
        var me = this,
            grid = me.getView(),
            store = grid.getStore(),
            modelName = store.getModel().getName(),
            cellEditing = grid.getPlugin('cellplugin');

        store.insert(0, Ext.create(modelName, {
            last_update: new Date()
        }));

        cellEditing.startEditByPosition({row: 0, column: 1});
    },

    onButtonClickSave: function (button, e, options) {
        var me = this,
            grid = me.getView(),
            store = grid.getStore(),
            errors = grid.validate();

        if (errors === undefined){
            store.sync();
        } else {
            Ext.Msg.alert(errors);
        }
    },

    onButtonClickCancel: function (button, e, options) {
        this.getView().getStore().reload();
    },

    onButtonClickClearFilter: function (button, e, options) {
        this.getView().filters.clearFilters();
    },

    onWidgetClick: function(grid, button){

        var me = this,
            grid = me.getView(),
            store = grid.getStore(),
            rec = button.getWidgetRecord();

        store.remove(rec);
        Ext.Msg.alert('Delete', 'Save the changes to persist the removed record.');
    },

    onButtonToggleClearGrouping: function (button, pressed, options) {

        var store = this.getView().getStore();

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