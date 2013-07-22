Ext.define('Packt.view.MainPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainpanel',

    requires: [
        'Ext.ux.IFrame'
    ],

    activeTab: 0,

    items: [
        {
            xtype: 'panel',
            closable: false,
            iconCls: 'home',
            title: 'Home',
            layout: 'fit'
            // items: [{
            //     xtype: 'uxiframe',
            //     src: 'http://www.packtpub.com/mastering-ext-javascript/book'
            // }]
        }
    ]
});