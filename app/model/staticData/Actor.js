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
        first_name: [
            { type: 'presence', message: 'This field is mandatory'},
            { type: 'length', min: 2, max: 45}
        ],
        last_name: [
            { type: 'presence', message: 'This field is mandatory'},
            { type: 'length', min: 2, max: 45}
        ]
    },

    manyToMany: {
        ActorFilms: {
            type: 'Film',
            role: 'films',
            field: 'film_id',
            right: {
                field: 'actor_id',
                role: 'actors'
            }
        }
    }
});