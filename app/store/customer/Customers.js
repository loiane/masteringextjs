Ext.define('Packt.store.customer.Customers', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.model.customer.Customer',
        'Packt.proxy.StaticData'
    ],

    model: 'Packt.model.customer.Customer',

    storeId: 'customers',

    proxy: {
        type: 'ajax',
        url: 'php/customer/list.php',
        
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});