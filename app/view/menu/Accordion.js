Ext.define('Packt.view.menu.Accordion', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainmenu',

    width: 300,
    layout: {
        type: 'accordion'
    },
    collapsible: false,
    hideCollapseTool: false,
    iconCls: 'sitemap',
    title: 'Menu'
});