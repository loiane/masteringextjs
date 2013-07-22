Ext.onReady(function() {

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            region: 'north',
            html: Ext.getDom('headerCont').innerHTML,
            border: false,
            margins: '0 0 5 0',
            height: 100,
            dockedItems: [{
                xtype: 'toolbar',
                itemId: 'navToolbar',
                dock: 'bottom',
                ui: 'footer'
            }]
        }, {
            region: 'south',
            xtype: 'container',
            collapsible: true,
            html: Ext.getDom('footer').innerHTML,
            split: true,
            height: 25
        }, {
            region: 'east',
            xtype: 'container',
            collapsible: true,
            styleHtmlContent: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            split: true,
            width: 200,
            defaults: {
                xtype: 'panel',
                padding: '5px',
                margins: '0 0 5 0',
                collapsible: true,
                styleHtmlContent: true,
                autoScroll: true
            },
            items: [{
                title: 'Categories',
                html: Ext.getDom('categoriesCont').innerHTML
            },{
                title: 'Archives',
                html: Ext.getDom('archivesCont').innerHTML
            },{
                title: 'Recent Posts',
                html: Ext.getDom('recentCont').innerHTML
            },{
                title: 'Tag Cloud',
                html: Ext.getDom('tagsCont').innerHTML
            },{
                title: 'My Books',
                html: Ext.getDom('booksCont').innerHTML
            }]
        }, {
            region: 'center',
            xtype: 'container',  
            autoScroll: true,
            styleHtmlContent: true,   
            defaults: {
                xtype: 'panel',
                padding: '5px',
                margins: '0 0 5 0',
                collapsible: true,
                styleHtmlContent: true,
                autoScroll: true
            }
        }]
    });

    var posts = Ext.get(Ext.getDom('contentCont')).dom.children;
    var panel = Ext.ComponentQuery.query('container[region=center]')[0];
    Ext.Array.each(posts, function(post) {
        panel.add({
            title: Ext.get(post).child('div#title').getHTML(),
            html: post.innerHTML
        });
    });

    var buttons = Ext.get(Ext.getDom('links')).dom.children[0];
    var list = Ext.get(buttons).child('ul').dom.children;
    var toolbar = Ext.ComponentQuery.query('toolbar#navToolbar')[0];
    Ext.Array.each(list, function(li) {
        toolbar.add({
            text: Ext.get(li).dom.children[0].firstChild.data,
            href: Ext.get(li).dom.children[0].href,
            hrefTarget: '_self'
        });
    });    
});	