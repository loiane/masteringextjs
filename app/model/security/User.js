Ext.define('Packt.model.security.User', {
    extend: 'Packt.model.security.Base',

    entityName: 'User',

    fields: [
        { name: 'name' },
        { name: 'userName' },
        { name: 'email' },
        { name: 'picture' },
        { name: 'groups_id' , type: 'int'},
        { name:'groupName', type:'string', persist:false,
            convert:function(v, rec){
                var data = rec.data;
                if (data.group && data.group.name){
                    return data.group.name;
                }
                return data.groups_id;
            }
        }
    ],

    validators: {
        name: [
            { type: 'presence', message: 'This field is mandatory'},
            { type: 'length', min: 3, max: 100}
        ],
        userName: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)/i },
            { type: 'presence', message: 'This field is mandatory'},
            { type: 'length', min: 3, max: 25}
        ],
        email: [
            { type: 'presence', message: 'This field is mandatory'},
            { type: 'length', min: 5, max: 100},
            { type: 'email' }
        ],
        groups_id: 'presence'
    },

    hasOne: [
        {
            model: 'Group',
            name: 'group',
            foreignKey:'groups_id',
            associationKey: 'group'
        }
    ]
});