Ext.define('Packt.view.toolbar.CancelSave', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.cancelsave',

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
            text: 'Save',
            itemId: 'save',
            iconCls: 'save'
        }
    ]
});