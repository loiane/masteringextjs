Ext.define('Packt.view.menu.Accordion', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainmenu',

    width: 250,
    layout: {
        type: 'accordion',
        multi: true
    },
    collapsible: true,
    hideCollapseTool: false,
    split: true,
    iconCls: 'fa fa-sitemap fa-lg',
    title: translations.menu
});