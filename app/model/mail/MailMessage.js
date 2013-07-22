Ext.define('Packt.model.mail.MailMessage', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'importance'
        },
        {
            name: 'icon'
        },
        {
            name: 'attachement'
        },
        {
            name: 'from'
        },
        {
            name: 'subject'
        },
        {
            name: 'received'
        },
        {
            name: 'flag'
        },
        {
            name: 'folder'
        },
        {
            name: 'content'
        },
        {
            name: 'id'
        }
    ]
});