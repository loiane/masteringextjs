Ext.define('Packt.view.mail.MailList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.maillist',

    height: 250,
    width: 400,
    title: 'Inbox',
    store: 'mail.MailMessages',

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'mailDD'
        },
        getRowClass: function(record, rowIndex, rowParams, store){
            if (record.get('icon') == 'unread'){
                return "boldFont";
            }
        }
    },

    columns: [
        {
            xtype: 'gridcolumn',
            cls: 'importance',
            width: 18,
            dataIndex: 'importance',
            menuDisabled: true,
            text: 'Importance',
            renderer: function(value, metaData, record ){
                if (value == 1){
                    metaData.css = 'importance';
                }
                return '';
            }
        },
        {
            xtype: 'gridcolumn',
            cls: 'icon-msg',
            width: 21,
            dataIndex: 'icon',
            menuDisabled: true,
            text: 'Icon',
            renderer: function(value, metaData, record ){
                metaData.css = value;
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return '';
            } 
        },
        {
            xtype: 'gridcolumn',
            cls: 'attach',
            width: 18,
            dataIndex: 'attachement',
            menuDisabled: true,
            text: 'Attachement',
            renderer: function(value, metaData, record ){
                if (value == 1){
                    metaData.css = 'attach';
                }
                return '';
            }
        },
        {
            xtype: 'gridcolumn',
            cls: 'flagged',
            width: 20,
            dataIndex: 'flag',
            menuDisabled: true,
            text: 'Flag',
            renderer: function(value, metaData, record ){
                if (value == 1){
                    metaData.css = 'flag-email';
                }
                return '';
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'from',
            menuDisabled: true,
            width: 150,
            text: 'From'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'subject',
            menuDisabled: true,
            flex: 1,
            text: 'Subject'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'received',
            menuDisabled: true,
            width: 130,
            text: 'Received'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'preview-hide',
                    menu: {
                        xtype: 'menu',
                        itemId: 'preview',
                        width: 120,
                        items: [
                            {
                                xtype: 'menuitem',
                                itemId: 'hide',
                                iconCls: 'preview-hide',
                                text: 'Hide Preview'
                            },
                            {
                                xtype: 'menuitem',
                                itemId: 'bottom',
                                iconCls: 'preview-bottom',
                                text: 'Preview Bottom'
                            },
                            {
                                xtype: 'menuitem',
                                itemId: 'right',
                                iconCls: 'preview-right',
                                text: 'Preview Right'
                            }
                        ]
                    }
                }
            ]
        }
    ]

});