Ext.define('Packt.store.customer.Addresses', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.model.customer.Address',
        'Packt.proxy.StaticData'
    ],

    model: 'Packt.model.customer.Address',

    proxy: {
        type: 'staticdataproxy',
        extraParams: {
            entity: 'Address'
        }
    }
});