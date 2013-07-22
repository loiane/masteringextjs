Ext.define('Packt.view.toolbar.CancelClearAdd', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.cancelclearadd',

    flex: 1,
    dock: 'bottom',
    ui: 'footer',
    layout: {
        pack: 'end',
        type: 'hbox'
    },
    items: [
        {
            xtype: 'button',
            text: 'Cancel',
            itemId: 'cancel',
            iconCls: 'cancel'
        },
        {
            xtype: 'button',
            text: 'Clear',
            itemId: 'clear',
            iconCls: 'clear'
        },
        {
            xtype: 'button',
            text: 'Add Selected',
            itemId: 'save',
            iconCls: 'save'
        }
    ]
});