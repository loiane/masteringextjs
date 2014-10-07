Ext.define('Packt.proxy.Base', {
    extend: 'Ext.data.proxy.Ajax',
    xtype: 'proxy.base',

    requires: [
        'Packt.util.Util'
    ],

    api :{
        read : '{prefix}/{entityName:lowercase}/list.php',
        create: '{prefix}/{entityName:lowercase}/create.php',
        update: '{prefix}/{entityName:lowercase}/update.php',
        destroy: '{prefix}/{entityName:lowercase}/destroy.php'
    },

    reader: {
        type: 'json',
        rootProperty: 'msg',
        root: 'data'
    },

    writer: {
        type: 'json',
        writeAllFields: true,
        encode: true,
        allowSingle: false,
        rootProperty: 'data'
    },

    listeners: {
        exception: function(proxy, response, operation){
            Packt.util.Util.showErrorMsg(response.responseText);
        }
    }
});