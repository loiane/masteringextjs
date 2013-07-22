Ext.define('Packt.view.sakila.WindowForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowform',

    requires: [
        'Packt.view.toolbar.CancelSave'
    ],

    height: 400,
    width: 550,
    autoScroll: true,
    layout: {
        type: 'fit'
    },
    modal: true,

    //items must be overrriden in subclass

    dockedItems: [
        {
            xtype: 'cancelsave'
        }
    ]
});