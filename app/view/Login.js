Ext.define('Packt.view.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',

    requires: [
        'Packt.view.Translation'
    ],

    autoShow: true,
    height: 170,
    width: 360,
    layout: {
        type: 'fit'
    },
    iconCls: 'key',
    title: translations.login,
    closeAction: 'hide',
    closable: false,

    items: [
        {
            xtype: 'form',
            frame: false,
            bodyPadding: 15,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 60,
                allowBlank: false,
                vtype: 'alphanum',
                minLength: 3,
                msgTarget: 'under'
            },
            items: [
                {
                    name: 'user',
                    fieldLabel: translations.user,
                    maxLength: 25,
                    value: 'loiane'
                },
                {
                    inputType: 'password',
                    name: 'password',
                    fieldLabel: translations.password,
                    enableKeyEvents: true,
                    id: 'password',
                    maxLength: 15,
                    value: '123456',
                    //vtype: 'customPass',
                    msgTarget: 'side'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'translation'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'cancel',
                            iconCls: 'cancel',
                            text: translations.cancel
                        },
                        {
                            xtype: 'button',
                            itemId: 'submit',
                            formBind: true,
                            iconCls: 'key-go',
                            text: translations.submit
                        }
                    ]
                }
            ]
        }
    ]
});