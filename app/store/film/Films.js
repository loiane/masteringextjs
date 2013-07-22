Ext.define('Packt.store.film.Films', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.model.film.Film',
        'Packt.proxy.Sakila'
    ],

    model: 'Packt.model.film.Film',

    pageSize: 20,

    storeId: 'films',

    proxy: {
        type: 'sakila',
        url: 'php/inventory/list.php'
    }
});