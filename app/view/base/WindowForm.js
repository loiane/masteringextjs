Ext.define('Packt.view.base.WindowForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowform',

    requires: [
        'Packt.util.Util',
        'Packt.util.Glyphs',
        'Packt.view.base.CancelSaveToolbar'
    ],

    height: 400,
    width: 550,
    autoScroll: true,
    layout: {
        type: 'fit'
    },
    modal: true,
    closable: false,

    bind: {
        title: '{title}',
        glyph: '{glyph}'
    },

    //items must be overrriden in subclass

    dockedItems: [{
        xtype: 'cancel-save-toolbar'
    }]
});