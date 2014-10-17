Ext.define('Packt.view.film.FilmsController', {
    extend: 'Packt.view.base.ViewController',

    alias: 'controller.films',

    requires: [
        'Packt.view.film.FilmWindow'
    ],

    createDialog: function(record){

        //console.log(Ext.getStore('staticData.Categories').data.items);
        //console.log(this.getStore('categories').data.items);
        //console.log(this.getStore('films').data.items[0]);

        var me = this,
            view = me.getView(),
            glyphs = Packt.util.Glyphs;

        me.isEdit = !!record;
        me.dialog = view.add({
            xtype: 'film-window',
            viewModel: {
                data: {
                    title: record ? 'Edit: ' + record.get('title') : 'Add Film',
                    glyph: record ? glyphs.getGlyph('edit') : glyphs.getGlyph('add')
                },
                links: {
                    currentFilm: record || {
                        type: 'Film',
                        create: true
                    }
                }
            },
            session: true //child session
        });

        me.dialog.show();
    },

    onSave: function(button, e, options){
        var me = this,
            dialog = me.dialog,
            form = me.lookupReference('filmForm'),
            isEdit = me.isEdit,
            id;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = dialog.getViewModel().get('currentFilm').id;
            }
            dialog.getSession().save();
            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                me.getStore('films').add(me.getSession().getRecord('Film', id));
            }
            me.onCancel();
        }

        me.viewSessionChanges();
    },

    onAddActor: function(button, e, options){
        var me = this;
        me.searchActors = Ext.create('Packt.view.film.FilmSearchActor');
        me.dialog.add(me.searchActors);
    },

    onDeleteActor: function(button, e, options){
        var customerGrid = this.lookupReference('actorsGrid'),
            selection = customerGrid.getSelectionModel().getSelection()[0];

        selection.drop();
    },

    onCancelActors: function(button, e, options){
        var me = this;
        me.searchActors = Ext.destroy(me.searchActors);
    },

    onClearActors: function(button, e, options){
        this.lookupReference('comboActors').clearValue();
    },

    onSaveActors: function(button, e, options){
        var me = this,
            value = me.lookupReference('comboActors').getValue(),
            store = me.getStore('actors'),
            model = store.findRecord('actor_id', value),
            actorsStore = me.lookupReference('actorsGrid').getStore(),
            a = me.dialog.getViewModel().get('currentFilm'),
            b = a.actors();

        me.lookupReference('actorsGrid').store = b;

        console.log(actorsStore);
        console.log(b);

        if (model){
            b.add(model);
        }

        me.onCancelActors();
    }
});
