Ext.define('MasteringExtJS.view.menu.MenuListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainmenu',


    init: function() {
        var me = this;

        //me.getView().getStore().load();
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        if (node && node.get('className')) {

            console.log(this.getView().up('app-main').getViewController());

            this.redirectTo( node.get("routeId"));
        }
    }
});