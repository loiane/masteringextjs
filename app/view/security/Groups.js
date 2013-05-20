Ext.define('Packt.view.security.Groups', {
    extend: 'Ext.container.Container',
    alias: 'widget.groups',

    requires: [
        'Packt.view.security.GroupsList',
        'Packt.view.security.GroupPermissions',
        'Packt.view.security.GroupsEdit'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'groupslist',
            flex: 1
        },
        {
            xtype: 'groupsedit',
            flex: 2
        }
    ]

});