Ext.define('Packt.view.mail.MailMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.mailMenu',

    cls: 'selected-node',
    autoScroll: true,
    store: 'mail.MailMenu',
    rootVisible: false,
    split: true,
    width: 150,
    collapsible: true,
    title: 'Mail',
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            ddGroup: 'mailDD',
            enableDrag: false
        }
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'new-mail',
                    text: 'New Message',
                    itemId: 'newMail'
                }
            ]
        }
    ]
});