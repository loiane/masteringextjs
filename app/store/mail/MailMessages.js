Ext.define('Packt.store.mail.MailMessages', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.model.mail.MailMessage',
        'Packt.proxy.Sakila'
    ],

    model: 'Packt.model.mail.MailMessage',

    pageSize: 20,

    storeId: 'films',

    autoLoad: true,

    proxy: {
        type: 'sakila',
        api: {
            read: 'php/mail/listInbox.php',
            update: 'php/mail/update.php'
        } 
    }
});