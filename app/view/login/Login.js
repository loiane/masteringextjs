Ext.define('Packt.view.login.Login', {
    extend: 'Ext.window.Window',

    xtype: 'login',

    requires: [
        'Packt.view.login.LoginController',
        'Packt.view.locale.Translation'
    ],

    controller: 'login',

    autoShow: true,
    height: 170,
    width: 360,
    layout: {
        type: 'fit'
    },
    iconCls: 'fa fa-key fa-lg',
    title: 'Login',
    closeAction: 'hide',
    closable: false,
    draggable: false,
    resizable: false,

    items: [
        {
            xtype: 'form',
            reference: 'form',
            bodyPadding: 15,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 60,
                allowBlank: false,
                vtype: 'alphanum',
                minLength: 3,
                msgTarget: 'under',
                enableKeyEvents: true,
                listeners: {
                    specialKey: 'onTextFieldSpecialKey'
                }
            },
            items: [
                {
                    name: 'user',
                    fieldLabel: 'User',
                    maxLength: 25,
                    value: 'loiane'
                },
                {
                    inputType: 'password',
                    name: 'password',
                    fieldLabel: 'Password',
                    id: 'password',
                    maxLength: 15,
                    value: 'Packt123@',
                    vtype: 'customPass',
                    msgTarget: 'side',
                    listeners: {
                        keypress: 'onTextFieldKeyPress'
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
//                        {
//                            xtype: 'translation'
//                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-times fa-lg',
                            text: 'Cancel',
                            listeners: {
                                click: 'onButtonClickCancel'
                            }
                        },
                        {
                            xtype: 'button',
                            formBind: true,
                            iconCls: 'fa fa-sign-in fa-lg',
                            text: 'Submit',
                            listeners: {
                                click: 'onButtonClickSubmit'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});