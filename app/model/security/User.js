Ext.define('Packt.model.security.User', {
    extend: 'Packt.model.security.Base',

    fields: [
        { name: 'name' },
        { name: 'userName' },
        { name: 'email' },
        { name: 'picture' },
        { name: 'group_id'},
        { name:'groupName', type:'string', persist:false,
            convert:function(v, rec){
                return rec.data.menu.name;
            }
        }
    ]//,

//    hasOne: [
//        {
//            model: 'Packt.model.security.Group',
//            name: 'group',
//            getterName:'getGroup',
//            setterName:'setGroup',
//            foreignKey:'group_id'
//        }
//    ]
});