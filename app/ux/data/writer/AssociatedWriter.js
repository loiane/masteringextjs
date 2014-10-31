Ext.define('Packt.ux.data.writer.AssociatedWriter', {
    extend: 'Ext.data.writer.Json',
    alias: 'writer.associatedjson',

    constructor: function(config) {
        this.callParent(arguments);
    },

    getRecordData: function (record, operation) {
        record.data = this.callParent(arguments);
        Ext.apply(record.data, record.getAssociatedData());
        return record.data;
    }
});