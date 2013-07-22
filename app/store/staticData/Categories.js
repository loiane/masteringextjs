Ext.define('Packt.store.staticData.Categories', {
    extend: 'Packt.store.staticData.Abstract',

    requires: [
        'Packt.model.staticData.Category',
        'Packt.proxy.StaticData'
    ],

    model: 'Packt.model.staticData.Category',

    autoLoad: true,

    storeId: 'categories',

    proxy: {
        type: 'staticdataproxy',
        extraParams: {
            entity: 'Category'
        }
    }
});