Ext.define('MasteringExtJS.store.Locales', {
    extend: 'Ext.data.Store',

    storeId: 'locales',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'en', type: 'string'},
        {name: 'es', type: 'string'},
        {name: 'pt_BR',  type: 'string'}
    ],

    data : [
        {
            id: 'appName',
            en: 'DVD Rental Store',
            es: 'DVD Rental Store',
            pt_BR: 'DVD Rental Store'
        },
        {
            id: 'logout',
            en: 'Logout',
            es: 'Salir',
            pt_BR: 'Sair'
        }
    ]
});

function _ (textId) {
    var store = Ext.getStore('locales'),
        rec = store !== undefined ? store.findRecord('id', textId) : undefined,
        lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en';
    return rec ? rec.get(lang) : textId;
}