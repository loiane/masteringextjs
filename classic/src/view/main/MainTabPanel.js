Ext.define('MasteringExtJS.view.main.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainpanel',

    requires: [
        'Ext.Panel',
        'Ext.layout.container.Fit'
    ],

    activeTab: 0,

    //[W] Panel mainpanel-1010 is a region section of the application, but it does not have a title. Per WAI-ARIA, all regions should have a heading element that contains region's title.
    //title: 'Home',

    items: [
        {
            xtype: 'panel',
            closable: false,
            iconCls: 'fa fa-home fa-lg tabIcon',
            title: 'Home',
            layout: 'fit'
        }
    ]
});