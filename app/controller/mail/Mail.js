Ext.define('Packt.controller.mail.Mail', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.ux.IFrame'
    ],

    views: [
        'mail.MailContainer',
        'mail.MailList',
        'mail.MailPreview',
        'mail.NewMail'
    ],

    stores: [
        'mail.MailMessages',
        'mail.MailMenu'
    ],

    attachPosition: 6,

    init: function(application) {
        this.control({
            "menu#preview menuitem": {
                click: this.onMenuitemClick
            },
            "maillist": {
                selectionchange: this.onGridSelect,
                itemdblclick: this.onGridDBlclick,
                viewready: this.onGridViewReady
            },
            "mailMenu": {
                select: this.onTreepanelSelect,
                viewready: this.onTreeViewReady
            },
            "mailMenu treeview": {
                beforedrop: this.onBeforeDrop
            },
            "mailMenu button#newMail": {
                click: this.onNewMessage
            },
            "newmail button#attach": {
                click: this.onNewAttach
            },
            "newmail button#bcc": {
                click: this.onShowBcc
            }//,
            // "newmail button#send": {
            //     click: this.onSendMail
            // }
        });
    },

    onMenuitemClick: function(item, e, options) {

        var button = item.up('button');
        var east = Ext.ComponentQuery.query('mailcontainer container#previewEast')[0];
        var south = Ext.ComponentQuery.query('mailcontainer container#previewSouth')[0];

        switch (item.itemId) {
            case 'bottom':
                east.hide();
                south.show();
                button.setIconCls('preview-bottom');
                break;
            case 'right':
                south.hide();
                east.show();
                button.setIconCls('preview-right');
                break;
            default:
                south.hide();
                east.hide();
                button.setIconCls('preview-hide');
                break;
        }
    },

    onGridViewReady: function(view, options){
        var store = view.getStore();
        store.clearFilter();
        store.filter("folder", "inbox");
    },

    onGridSelect: function(grid, record, option){
        //console.log(record[0].get('id'));

        if (record[0]){
            var id = record[0].get('id');
            var panels = Ext.ComponentQuery.query('mailpreview');

            var preview = {
                xtype: 'component',
                style: 'background-color:#FFF',
                loader: {
                    url: 'php/mail/loadContent.php?id=' + id,
                    autoLoad: true
                }
            };

            Ext.each(panels, function(panel){
                panel.removeAll();
                panel.add(preview);
            });
        }
    },

    onGridDBlclick: function(grid, record, item, index, e, option){
        var id = record.get('id');
        Ext.create('Ext.window.Window',{
            width: 500,
            height: 400,
            autoScroll: true,
            loader: {
                url: 'php/mail/loadContent.php?id=' + id,
                autoLoad: true
            }
        }).show();
    },

    onTreeViewReady: function(treeview, option){

        var task = new Ext.util.DelayedTask(function(){
            treeview.getSelectionModel().select(0);
        });
        task.delay(100);
    },

    onTreepanelSelect: function(selModel, record, index, options) {

        var folder = record.get('text');
        var store = Ext.ComponentQuery.query('maillist')[0].getStore();
        store.clearFilter();
        store.filter("folder", folder);
    },

    onBeforeDrop: function(node, data, overModel, dropPosition, dropHandler, options) {    
        data.records[0].set('leaf', true);
        data.records[0].set('checked', null);
        //console.log(overModel.get('text'));
        
        Ext.each(data.records, function(rec){
            rec.set('folder',overModel.get('text'));
            //console.log(rec);
        });
        dropHandler.cancelDrop();

        var store = Ext.ComponentQuery.query('maillist')[0].getStore();
        store.sync();       
    },

    onNewMessage: function(button, e, options){
        Ext.create('Packt.view.mail.NewMail');
        this.attachPosition = 6;
    },

    onNewAttach: function(button, e, options){
        var form = button.up('window').down('form');

        var fileUpload = {
            xtype: 'filefield',
            anchor: '100%',
            name: 'file' + (this.attachPosition%6)
        };

        form.insert(this.attachPosition++, fileUpload);
    },

    onShowBcc: function(button, e, options){
        var cc = Ext.ComponentQuery.query('textfield[name=cc]')[0];
        var bcc = Ext.ComponentQuery.query('textfield[name=bcc]')[0];

        cc.show();
        bcc.show();
    }

});
