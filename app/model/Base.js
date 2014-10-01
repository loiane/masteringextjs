Ext.define('Packt.model.Base', {
    extend: 'Ext.data.Model',

    requires: [
        'Packt.util.Util'
    ],

    idProperty: 'id',

    fields: [
        { name: 'id', type: 'int' }
    ],

    schema: {
        namespace: 'Packt.model',
        urlPrefix: 'php',
        proxy: {
            type: 'ajax',
            url: '{prefix}/{entityName:lowercase}/list.php',
            reader: {
                type: 'json',
                rootProperty: 'data'
            },
            listeners: {
                exception: function(proxy, response, operation){
                    Packt.util.Util.showErrorMsg(response.responseText);
                }
            }
        }
    }
});