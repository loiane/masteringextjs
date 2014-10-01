Ext.define('Packt.model.security.Base', {
    extend: 'Ext.data.Model',

    schema: {
        namespace: 'Packt.model.security',
        urlPrefix: 'php/security',
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