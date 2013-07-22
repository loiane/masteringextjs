Ext.define('Packt.model.sakila.Sakila', {
    extend: 'Ext.data.Model',

    fields: [
        { 
        	name: 'last_update',
        	type: 'date',
        	dateFormat: 'Y-m-j H:i:s'
        }
    ]
});