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
        },
        {
            id: 'menu1',
            en: 'Security',
            es: '',
            pt_BR: ''
        },
        {
            id: 'menu11',
            en: 'Groups and Permissions',
            es: '',
            pt_BR: ''
        },
        {
            id: 'menu12',
            en: 'Users',
            es: '',
            pt_BR: ''
        },
        {
            id: 'staticData',
            en: 'Static Data',
            es: '',
            pt_BR: ''
        },
        {
            id: 'actors',
            en: 'Actors',
            es: '',
            pt_BR: ''
        },
        {
            id: 'categories',
            en: 'Categories',
            es: '',
            pt_BR: ''
        },
        {
            id: 'languages',
            en: 'Languages',
            es: '',
            pt_BR: ''
        },
        {
            id: 'cities',
            en: 'Cities',
            es: '',
            pt_BR: ''
        },
        {
            id: 'countries',
            en: 'Countries',
            es: '',
            pt_BR: ''
        },
        {
            id: 'cms',
            en: 'Content Management',
            es: '',
            pt_BR: ''
        },
        {
            id: 'films',
            en: 'Films',
            es: '',
            pt_BR: ''
        },
        {
            id: 'reports',
            en: 'Reports',
            es: '',
            pt_BR: ''
        },
        {
            id: 'salesfilmcategory',
            en: 'Sales by Film Category',
            es: '',
            pt_BR: ''
        }
    ]
});

function _ (textId) {
    var store = Ext.getStore('locales'),
        rec = store !== undefined ? store.findRecord('id', textId) : undefined,
        lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en';
    return rec ? rec.get(lang) : textId;
}