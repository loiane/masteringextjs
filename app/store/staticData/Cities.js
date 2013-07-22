Ext.define('Packt.store.staticData.Cities', {
    extend: 'Packt.store.staticData.Abstract',

    requires: [
        'Packt.model.staticData.City',
        'Packt.proxy.StaticData'
    ],

    model: 'Packt.model.staticData.City',

    groupField: 'country_id',

    proxy: {
        type: 'staticdataproxy',
        extraParams: {
            entity: 'City'
        }
    }
});