Ext.define('Packt.store.staticData.Actors', {
    extend: 'Packt.store.staticData.Abstract',

    requires: [
        'Packt.model.staticData.Actor',
        'Packt.proxy.StaticData'
    ],

    model: 'Packt.model.staticData.Actor',

    autoLoad: true,

    storeId: 'actors',

    proxy: {
        type: 'staticdataproxy',
        extraParams: {
            entity: 'Actor'
        }
    }
});