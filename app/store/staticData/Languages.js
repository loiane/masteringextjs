Ext.define('Packt.store.staticData.Languages', {
    extend: 'Packt.store.staticData.Abstract',

    requires: [
        'Packt.model.staticData.Language',
        'Packt.proxy.StaticData'
    ],

    model: 'Packt.model.staticData.Language',

    storeId: 'languages',

    autoLoad: true,

    proxy: {
        type: 'staticdataproxy',
        extraParams: {
            entity: 'Language'
        }
    }
});