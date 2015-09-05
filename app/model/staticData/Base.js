Ext.define('MasteringExtJS.model.staticData.Base', {
    extend: 'MasteringExtJS.model.Base',

    fields: [
        {
            name: 'last_update',
            type: 'date',
            dateFormat: 'Y-m-j H:i:s'
        }
    ],

    validators: {
        last_update: 'presence'
    }
});