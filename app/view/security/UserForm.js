Ext.define('Packt.view.security.UserForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.user-form',

    height: 270,
    width: 600,

    requires: [
        'Packt.util.Util',
        'Packt.util.Glyphs'
    ],

    layout: {
        type: 'fit'
    },

    bind: {
        title: '{title}'
    },

    closable: false,
    modal: true,

    items: [
        {
            xtype: 'form',
            reference: 'form',
            bodyPadding: 5,
            modelValidation: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    title: 'User Information',
                    layout: 'anchor',
                    defaults: {
                        afterLabelTextTpl: Packt.util.Util.required,
                        anchor: '100%',
                        xtype: 'textfield',
                        msgTarget: 'side',
                        labelWidth: 75
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'id',
                            fieldLabel: 'Label',
                            bind : '{currentUser.id}'
                        },
                        {
                            fieldLabel: 'Username',
                            name: 'userName',
                            bind : '{currentUser.userName}'
                        },
                        {
                            fieldLabel: 'Name',
                            name: 'name',
                            bind : '{currentUser.name}'
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'email',
                            bind : '{currentUser.email}'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Group',
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local',
                            forceSelection: true,
                            editable: false,
                            name: 'groups_id',
                            bind: {
                                value: '{currentUser.groups_id}',
                                store: '{groups}',
                                selection: '{currentUser.group}'
                            }
                        },
                        {
                            xtype: 'filefield',
                            fieldLabel: 'Photo',
                            anchor: '100%',
                            name: 'picture',
                            buttonText: 'Select Photo...',
                            afterLabelTextTpl: '',
                            listeners: {
                                change: 'onFileFieldChange'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Photo',
                    width: 170,
                    items: [
                        {
                            xtype: 'image',
                            reference: 'userPicture',
                            height: 150,
                            width: 150,
                            bind:{
                                src: 'resources/profileImages/{currentUser.picture}'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'end',
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Save',
                    glyph: Packt.util.Glyphs.getGlyph('save'),
                    listeners: {
                        click: 'onSave'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    glyph: Packt.util.Glyphs.getGlyph('cancel'),
                    listeners: {
                        click: 'onCancel'
                    }
                }
            ]
        }
    ]
});