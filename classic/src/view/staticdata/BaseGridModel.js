Ext.define('MasteringExtJS.view.staticdata.BaseGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.basegrid',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'BaseGrid',
            autoLoad: true
        }
        */
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});