Ext.define('Packt.model.Base', {
    extend: 'Ext.data.Model',

    requires: [
        'Packt.util.Util',
        'Packt.ux.data.writer.AssociatedWriter'
    ],

    schema: {
        namespace: 'Packt.model',
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
                type: 'associatedjson',
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