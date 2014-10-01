Ext.define('Packt.view.security.UserForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.userform',

    height: 280,
    width: 550,

    requires: ['Packt.util.Util'],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'User',
    closeAction: 'hide',
    modal: true,

    reference: 'userForm',

    items: [
        {
            xtype: 'form',
            bodyPadding: 5,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    flex: 2,
                    title: 'User Information',
                    defaults: {
                        //afterLabelTextTpl: Packt.util.Util.required,
                        anchor: '100%',
                        xtype: 'textfield',
                        allowBlank: false,
                        labelWidth: 60
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            fieldLabel: 'Label',
                            name: 'id'
                        },
                        {
                            fieldLabel: 'Username',
                            name: 'userName',
                            bind : '{currentUser.userName}'
                        },
                        {
                            fieldLabel: 'Name',
                            maxLength: 100,
                            name: 'name',
                            bind : '{currentUser.name}'
                        },
                        {
                            fieldLabel: 'Email',
                            maxLength: 100,
                            name: 'email',
                            bind : '{currentUser.email}'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Picture',
                    width: 170,
                    items: [
                        {
                            xtype: 'image',
                            height: 150,
                            width: 150,
                            src: ''
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
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
        }
    ]
});