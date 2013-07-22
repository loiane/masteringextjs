Ext.define('Packt.view.security.Users', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.users',

    requires: [
        'Packt.view.security.UsersList'
    ],

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'userslist'
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
                    iconCls: 'add'
                },
                {
                    xtype: 'button',
                    text: 'Edit',
                    itemId: 'edit',
                    iconCls: 'edit'
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    itemId: 'delete',
                    iconCls: 'delete'
                }
            ]
        }
    ]
});