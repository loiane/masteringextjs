Ext.define('Packt.model.staticData.Actor', {
    extend: 'Packt.model.staticData.Base',

    entityName: 'Actor',

    idProperty: 'actor_id',

    fields: [
        { name: 'actor_id' },
        { name: 'first_name'},//, defaultValue: 'First Name*'},
        { name: 'last_name'}// , defaultValue: 'Last Name*'}
    ],

    validators: {
        first_name: 'presence',
        last_name: { type: 'length', min: 2 }
    }
});