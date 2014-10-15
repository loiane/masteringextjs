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

    onEdit: function(button){
        this.createDialog(button.getWidgetRecord());
    },

    createDialog: function(record){

        //console.log(Ext.getStore('staticData.Categories').data.items);
        //console.log(this.getStore('categories').data.items);
        //console.log(this.getStore('films').data.items[0]);

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
