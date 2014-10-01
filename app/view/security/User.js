Ext.define('Packt.view.security.User', {
    extend: 'Ext.panel.Panel',
    xtype: 'user',

    requires: [
        'Packt.view.security.UsersGrid',
        'Packt.view.security.UserModel',
        'Packt.view.security.UserController'
    ],

    controller: 'user',
    viewModel: {
        type: 'user'
    },

    frame: true,

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'usersgrid'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    itemId: 'add',
                    iconCls: 'add',
                    listeners: {
                        click: 'onAdd'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Edit',
                    itemId: 'edit',
                    iconCls: 'edit',
                    listeners: {
                        click: 'onEdit'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    itemId: 'delete',
                    iconCls: 'delete',
                    listeners: {
                        click: 'onDelete'
                    }
                }
            ]
        }
    ]
});