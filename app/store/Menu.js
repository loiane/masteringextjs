Ext.define('Packt.store.Menu', {
    extend: 'Ext.data.Store',

    requires: [
        'Packt.util.Util'
    ],

    model: 'Packt.model.menu.Accordion',

    proxy: {
        type: 'ajax',
        url: 'php/menu/list.php',

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
});