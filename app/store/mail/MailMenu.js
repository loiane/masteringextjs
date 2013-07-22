Ext.define('Packt.store.mail.MailMenu', {
    extend: 'Ext.data.TreeStore',

    clearOnLoad: true,

    proxy: {
        type: 'ajax',
        url: 'php/mail/mailMenu.php'
    }
});