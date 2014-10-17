Ext.define('Packt.store.film.SearchActors', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.model.film.SearchActor'
    ],

    alias: 'store.search-actors',

    model: 'Packt.model.film.SearchActor',

    pageSize: 2,

    proxy: {
        type: 'ajax',
        url: 'php/actor/searchActors.php',

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});