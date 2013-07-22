Ext.define('Packt.store.staticData.Countries', {
    extend: 'Packt.store.staticData.Abstract',

    requires: [
        'Packt.model.staticData.Country',
        'Packt.proxy.StaticData'
    ],

    model: 'Packt.model.staticData.Country',

    autoLoad: true,

    storeId: 'countries',

    proxy: {
        type: 'staticdataproxy',
        extraParams: {
            entity: 'Country'
        }
    }
});