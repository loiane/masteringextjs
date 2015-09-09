Ext.define('MasteringExtJS.store.staticData.Actors', {
    extend: 'MasteringExtJS.store.staticData.Base',

    requires: [
        'MasteringExtJS.model.staticData.Actor'
    ],

    storeId: 'staticData.Actors',

    alias: 'store.actors',

    model: 'MasteringExtJS.model.staticData.Actor',

    autoLoad: true
});