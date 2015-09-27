Ext.define('MasteringExtJS.model.staticData.Actor', {
    extend: 'MasteringExtJS.model.Base',

    entityName: 'Actor',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'firstName'},//, defaultValue: 'First Name*'},
        { name: 'lastName'}// , defaultValue: 'Last Name*'}
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
    }/*,

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
    }*/
});