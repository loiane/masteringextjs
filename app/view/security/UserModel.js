Ext.define('Packt.view.security.UserModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.user',

    stores: {
        users: {
            model: 'Packt.model.security.User',
            autoLoad: true
        },
        groups: {
            model: 'Packt.model.security.Group',
            autoLoad: true
        }
    }
//    },
//
//    formulas: {
//        currentUser : {
//
//            bind: {
//                bindTo: '{usersGrid.selection}',
//                deep: true
//            },
//
//            get: function(user){
//                return user;
//            },
//
//            set: function(user){
//                var me = this;
//                if (!user.isModel){
//                    user = me.get('users').getById(user);
//                }
//                me.set('currentUser',user);
//            }
//        }
//    }
});