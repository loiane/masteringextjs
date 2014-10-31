/**
 * The main application controller. This is a good place to handle things like routes.
 */
Ext.define('Packt.controller.Root', {
    extend: 'Ext.app.Controller',

    requires: [
        'Packt.util.Util'
    ],

    init: function() {
        this.addRef([{
            ref: 'main',
            selector: '[xtype=mainmenu]'
        },{
            ref: 'mainPanel',
            selector: 'mainpanel'
        },{
            ref: 'filmsGrid',
            selector: '[xtype=films-grid]'
        }]);
        this.callParent();
    },

    routes : {
        'home' : 'onHome',

        'user|actorsgrid|categoriesgrid|languagesgrid|citiesgrid|countriesgrid|films|salesfilmcategory' :{
            before: 'onBeforeRoute',
            action: 'onRoute'
        },
        
        'films/:id' : {
            action: 'onFilmSelect',
            before: 'onBeforeFilmSelect',
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

    onBeforeRoute: function(action){
        var hash = Ext.util.History.getToken();

        Ext.Ajax.request({
            url     : 'php/security/verifyEntitlement.php',
            params  : {
                module : hash
            },
            success : function() {
                action.resume();
            },
            failure : function() {
                action.stop();
            }
        });
    },

    onRoute: function(){
        var me = this,
            hash = Ext.util.History.getToken(),
            main = me.getMain();

        if (!main){
            var task = new Ext.util.DelayedTask(function() {
                console.log('delayed');
                main = me.getMain();
                me.locateMenuItem(main, hash);
            });
            task.delay(2000);
        } else {
            me.locateMenuItem(main, hash);
        }
    },

    onUnmatchedRoute : function(hash) {

        Packt.util.Util.showErrorMsg('Hash does not exist!');
    },

    locateMenuItem: function(mainMenu, hash){
        var me = this,
            root, node;
        Ext.each(mainMenu.items.items, function(tree){
            if (tree.getXType() === 'menutree'){
                root = tree.getRootNode();
                node = root.findChild('className', hash);
                if (node){
                    //tree.fireEvent('itemclick', tree, node);
                    me.openTab(node);
                    return;
                }
            }
        });
    },

    openTab: function(record){
        var mainPanel = this.getMainPanel();

        var newTab = mainPanel.items.findBy(
            function (tab){
                return tab.title === record.get('text');
            });

        if (!newTab){
            newTab = mainPanel.add({
                xtype: record.get('className'),
                glyph: record.get('glyph') + '@FontAwesome',
                title: record.get('text'),
                closable: true
            });
        }

        mainPanel.setActiveTab(newTab);
    },

    onBeforeFilmSelect: function(id, action){

        var me = this,
            main = me.getMain();

        if (!main){
            if (!main){
                var task = new Ext.util.DelayedTask(function() {
                    me.onBeforeFilmSelectResume(id, action);
                });
                task.delay(2000);
            } else {
                me.onBeforeFilmSelectResume(id, action);
            }
        }
    },

    onBeforeFilmSelectResume: function(id, action){

        this.locateMenuItem(this.getMain(),'films');

        // check if record is in grid
        var record = this.getFilmsGrid().getStore().findRecord('film_id', id);
        if(record) {
            action.resume();
        }
        else {
            action.stop();
        }
    },

    onFilmSelect: function(id){
        console.log('select ' + id);
        this.getFilmsGrid().fireEvent('selectfilm', id);
    }
});
