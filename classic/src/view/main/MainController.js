Ext.define('MasteringExtJS.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    onRouteChange:function(id){
        this.setCurrentView(id);
    },

    setCurrentView: function(hashTag) {

        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainPanel = refs.mainPanel,
            mainMenu = refs.mainMenu,
            viewModel = me.getViewModel(),
            vmData = viewModel.getData(),
            store = mainMenu.getStore(),
            node = store.findNode('routeId', hashTag),
            view = node ? node.get('className') : null,
            newView;

        newView = mainPanel.items.findBy(
            function (tab){
                return tab.title === node.get('text');
        });

        if (!newView) {
            newView = Ext.create('MasteringExtJS.view.' + (view || 'pages.Error404Window'), {
                hideMode: 'offsets',
                routeId: hashTag,
                glyph: node.get('glyph') + '@FontAwesome',
                title: node.get('text'),
                closable: true
            });
        }

        mainPanel.setActiveTab(newView);

        mainMenu.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        if (node && node.get('className')) {
            this.redirectTo( node.get("routeId"));
        }
    }
});
