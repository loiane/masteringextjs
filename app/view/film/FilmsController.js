Ext.define('Packt.view.film.FilmsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.films',

    requires: [
        'Packt.util.Util',
        'Packt.view.film.FilmWindow'
    ],

    onAdd: function(button, e, options){
        this.createDialog(null);
    },

    createDialog: function(record){

        var me = this,
            view = me.getView();

        me.dialog = view.add({
            xtype: 'film-window',
            viewModel: {
                data: {
                    title: record ? 'Edit: ' + record.get('title') : 'Add Film'
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
    }
});
