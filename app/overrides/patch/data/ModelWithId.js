/**
 * Fixes error "cannot load phantom model" when calling Model.load(id)
 *
 * See http://www.sencha.com/forum/showthread.php?286388
 */
Ext.define('Packt.overrides.patch.data.ModelWithId', {
    override: 'Ext.data.Model',

    inheritableStatics: {
        load: function(id, options, session) {
            var rec = this.createWithId(id, options, session);
            rec.load(options);
            return rec;
        }
    }

}, function() {
    //<debug>
    if (!Ext.getVersion().match('5.0.0.970')) {
        //console.warn('This patch has not been tested with this version of ExtJS');
    }
    //</debug>
});