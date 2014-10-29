Ext.define('Packt.view.film.FilmsModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.films',

    stores: {
        films: {
            model: 'Packt.model.film.Film',
            pageSize: 15,
            autoLoad: true,
            session: true
        },
        categories: {
            source: 'staticData.Categories',
            autoLoad: true,
            session: true
        },
        actors: {
            source: 'staticData.Actors',
            autoLoad: true,
            session: true
        },
        ratings: {
            model: 'Packt.model.TextCombo',
            data : [ // ENUM('G','PG','PG-13','R','NC-17')
                ['G'],
                ['PG'],
                ['PG-13'],
                ['R'],
                ['NC-17']
            ],
            session: true
        },
        special_features: {
            model: 'Packt.model.TextCombo',
            data : [
                ['Trailers'],
                ['Commentaries'],
                ['Deleted Scenes'],
                ['Behind the Scenes']
            ],
            session: true
        }
    },

    formulas: {
        specialFeatures : {

            bind: {
                bindTo: '{currentFilm.special_features}',
                deep: true
            },

            get: function(value){
                var values = value ? value.split(',') : [],
                    texts = [];
                values.forEach(function(item){
                    texts.push(Ext.create('Packt.model.TextCombo',{
                        text: item
                    }));
                });
                return texts;
            },

            set: function(value){
                if (value){
                    this.get('currentFilm').set('special_features', value.join());
                }
            }
        }
    }
});