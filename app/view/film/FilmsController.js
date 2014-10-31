Ext.define('Packt.view.film.FilmsController', {
    extend: 'Packt.view.base.ViewController',

    alias: 'controller.films',

    requires: [
        'Packt.view.film.FilmWindow',
        'Packt.ux.grid.Printer'
    ],

    onFilmSelect: function(id){
        var me = this,
            grid = me.lookupReference('filmsGrid'),
            store = me.getStore('films'),
            record = store.findRecord( 'film_id', id );

        if (record){
            grid.getSelectionModel().select(record);
        }
    },

    onItemClick: function( view, record, item, index, e, eOpts ) {
        this.redirectTo('films/' + record.get('film_id'));
    },

    createDialog: function(record){

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
            session = me.getSession(),
            id;

        if (form.isValid()) {
            if (!isEdit) {
                id = dialog.getViewModel().get('currentFilm').id;
            }
            dialog.getSession().save();
            if (!isEdit) {
                me.getStore('films').add(session.getRecord('Film', id));
            }
            me.onCancel();
        }

        me.viewSessionChanges();

        var batch = session.getSaveBatch();
        if (batch){
            batch.start();
        }
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
            actorsGrid = me.lookupReference('actorsGrid'),
            actorsStore = actorsGrid.getStore();

        if (model){
            actorsStore.add(model);
        }

        me.onCancelActors();
    },

    onPrint: function(button, e, options) {
        var printer = Packt.ux.grid.Printer;
        printer.printAutomatically = false;
        printer.print(this.lookupReference('filmsGrid'));
    },

    onExportPDF: function(button, e, options) {
        var mainPanel = Ext.ComponentQuery.query('mainpanel')[0];

        var newTab = mainPanel.add({
            xtype: 'panel',
            closable: true,
            glyph: Packt.util.Glyphs.getGlyph('pdf'),
            title: 'Films PDF',
            layout: 'fit',
            html: 'loading PDF...',
            items: [{
                xtype: 'uxiframe',
                src: 'php/pdf/exportFilmsPdf.php'
            }]
        });

        mainPanel.setActiveTab(newTab);
    },

    onExportExcel: function(button, e, options) {
        window.open('php/pdf/exportFilmsExcel.php');
    }
});
