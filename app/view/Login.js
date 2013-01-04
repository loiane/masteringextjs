Ext.define('Packt.view.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',

    autoShow: true,
    height: 144,
    width: 360,
    layout: {
        type: 'fit'
    },
    iconCls: 'key',
    title: "Login",
    closeAction: 'hide',

    items: [
        {
            xtype: 'form',
            frame: false,
            bodyPadding: 10,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                allowBlank: false
            },
            items: [
                {
                    //xtype: 'textfield',
                    //anchor: '100%',
                    name: 'user',
                    fieldLabel: "User"//,
                    //allowBlank: false
                },
                {
                    //xtype: 'textfield',
                    //anchor: '100%',
                    inputType: 'password',
                    name: 'password',
                    fieldLabel: "Password"//,
                    //allowBlank: false
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'cancel',
                            iconCls: 'cancel',
                            text: 'Cancel'
                        },
                        {
                            xtype: 'button',
                            itemId: 'submit',
                            formBind: true,
                            iconCls: 'key-go',
                            text: "Submit"
                        }
                    ]
                }
            ]
        }
    ]

});