Ext.define('Packt.view.sakila.SearchWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.searchWindow',

    requires: [
        'Packt.view.toolbar.CancelClearAdd'
    ],

    height: 300,
    width: 400,
    autoScroll: true,
    layout: {
        type: 'fit'
    },
    iconCls: 'find',
    modal: true,

    //items must be overrriden in subclass

    dockedItems: [
        {
            xtype: 'cancelclearadd'
        }
    ]
});