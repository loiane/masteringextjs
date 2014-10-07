Ext.define('Packt.view.security.User', {
    extend: 'Ext.panel.Panel',
    xtype: 'user',

    requires: [
        'Packt.view.security.UsersGrid',
        'Packt.view.security.UserModel',
        'Packt.view.security.UserController',
        'Packt.view.security.UserForm',
        'Packt.util.Glyphs'
    ],

    controller: 'user',
    viewModel: {
        type: 'user'
    },
    session: true,

    frame: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'users-grid',
            flex: 1
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    glyph: Packt.util.Glyphs.getGlyph('add'),
                    listeners: {
                        click: 'onAdd'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Edit',
                    glyph: Packt.util.Glyphs.getGlyph('edit'),
                    listeners: {
                        click: 'onEdit'
                    },
                    bind: {
                        disabled: '{!usersGrid.selection}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    glyph: Packt.util.Glyphs.getGlyph('destroy'),
                    listeners: {
                        click: 'onDelete'
                    },
                    bind: {
                        disabled: '{!usersGrid.selection}'
                    }
                }
            ]
        }
    ]
});