Ext.define('MasteringExtJS.model.staticData.Base', {
    extend: 'MasteringExtJS.model.Base',

    fields: [
        {
            name: 'lastUpdate',
            type: 'date',
            dateFormat: 'Y-m-j H:i:s'
        }
    ],

    validators: {
        last_update: 'presence'
    }
});