Ext.define('MasteringExtJS.model.Base', {
    extend: 'Ext.data.Model',

    requires: [
        'MasteringExtJS.util.Util',

        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    schema: {
        namespace: 'MasteringExtJS.model',
        urlPrefix: 'http://localhost:8080/masteringextjs-java',
        proxy: {
            type: 'rest',
            /*api :{
                read : '{prefix}/{entityName:lowercase}/list.php',
                create: '{prefix}/{entityName:lowercase}/create.php',
                update: '{prefix}/{entityName:lowercase}/update.php',
                destroy: '{prefix}/{entityName:lowercase}/destroy.php'
            },*/
            url: '{prefix}/{entityName:lowercase}/',
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
                    MasteringExtJS.util.Util.showErrorMsg(response.responseText);
                }
            }
        }
    }
});