/**
 * The main application controller. This is a good place to handle things like routes.
 */
Ext.define('Packt.controller.Root', {
    extend: 'Ext.app.Controller',


    init: function() {
        this.addRef([{
            ref: 'main',
            selector: '[xtype=mainpanel]'
        }]);
        this.callParent();
    },

    routes : {
        'home' : 'onHome',
        
        'films/:id' : {
            action     : 'onFilmSelect',
            conditions : {
                ':id' : '([0-9]+)'
            }
        }
    },

    onHome : function() {
        var mainPanel = this.getMain();
        if (mainPanel){
            mainPanel.setActiveTab(0);
        }
    },

    listen : {
        controller : {
            '*' : {
                unmatchedroute : 'onUnmatchedRoute'
            }
        }
    },

    onUnmatchedRoute : function(hash) {

        var me = this,
            mainMenu = me.getMain();

        if (!mainMenu){
            var task = new Ext.util.DelayedTask(function() {
                mainMenu = me.getMain();
                me.openTab(mainMenu, hash);
            });
            task.delay(2000);
        } else {
            me.openTab(mainMenu, hash);
        }
    },

    openTab: function(mainMenu, hash){
        var root, node;
        Ext.each(mainMenu.items.items, function(tree){
            if (tree.getXType() === 'menutree'){
                root = tree.getRootNode();
                node = root.findChild('className', hash);
                if (node){
                    tree.fireEvent('itemclick', tree, node);
                    return;
                }
            }
        });
    }
});
