Ext.define('Packt.view.mail.NewMail', {
    extend: 'Ext.window.Window',
    alias: 'widget.newmail',

    height: 409,
    width: 666,
    autoShow: true,
    layout: {
        type: 'fit'
    },
    title: 'Untitled - Message',
    iconCls: 'new-mail',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Send',
                            iconCls: 'send-mail',
                            itemId: 'send'
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'save'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'importance'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            text: 'Show Cc & Bcc',
                            iconCls: 'bcc',
                            itemId: 'bcc'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    frame: false,
                    bodyPadding: 10,
                    autoScroll: true,
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'To',
                            name: 'to'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Cc',
                            hidden: true,
                            name: 'cc'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Bcc',
                            hidden: true,
                            name: 'bcc'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Subject',
                            name: 'subject'
                        },
                        {
                            xtype: 'button',
                            text: 'Add...',
                            iconCls: 'attach',
                            itemId: 'attach'
                        },
                        {
                            xtype: 'filefield',
                            anchor: '100%',
                            name: 'file'
                        },
                        {
                            xtype: 'htmleditor',
                            anchor: '100%',
                            height: 168,
                            style: 'background-color: white;',
                            name: 'content'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});