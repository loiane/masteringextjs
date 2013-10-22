Ext.define('Packt.view.mail.MailContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.mailcontainer',

    requires: [
        'Packt.view.mail.MailList',
        'Packt.view.mail.MailPreview',
        'Packt.view.mail.MailMenu'
    ],

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        var mailPreview = {
            xtype: 'mailpreview',
            autoScroll: true
        };

        me.items = [
            {
                xtype: 'container',
                region: 'center',
                itemId: 'mailpanel',
                layout: {
                    type: 'border'
                },
                items: [
                    {
                        xtype: 'maillist',
                        collapsible: false,
                        region: 'center'
                    }]
            },
            {
                xtype: 'mailMenu',
                region: 'west',
                
            }
        ];

        me.callParent(arguments);
    }

});