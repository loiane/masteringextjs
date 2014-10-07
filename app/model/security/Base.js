Ext.define('Packt.model.security.Base', {
    extend: 'Ext.data.Model',

    requires: [
        'Packt.util.Util'
    ],

    idProperty: 'id',

    fields: [
        { name: 'id', type: 'int' }
    ],

    schema: {
        namespace: 'Packt.model.security',
        urlPrefix: 'php',
        proxy: {
            type: 'ajax',
            api :{
                read : '{prefix}/{entityName:lowercase}/list.php',
                create: '{prefix}/{entityName:lowercase}/create.php',
                update: '{prefix}/{entityName:lowercase}/update.php',
                destroy: '{prefix}/{entityName:lowercase}/destroy.php'
            },
            reader: {
                type: 'json',
                rootProperty: 'data'
            },
            writer: {
                type: 'json',
                writeAllFields: true,
                encode: true,
                rootProperty: 'data',
                allowSingle: false
            },
            listeners: {
                exception: function(proxy, response, operation){
                    Packt.util.Util.showErrorMsg(response.responseText);
                }
            }
        }
    }
});