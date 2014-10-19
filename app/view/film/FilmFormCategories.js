Ext.define('Packt.view.film.FilmFormCategories', {
    extend: 'Ext.container.Container',

    xtype: 'film-categories-form',

    requires: [
        'Ext.view.MultiSelector'
    ],

    title: 'Film Categories',

    layout: 'fit',

    items: [{
        xtype: 'multiselector',
        title: 'Selected Categories',
        reference: 'categoriesMultiSelector',

        fieldName: 'name',

        viewConfig: {
            deferEmptyText: false,
            emptyText: 'No categories selected'
        },

        bind: '{currentFilm.categories}',

        /*columns: {
            items: [
                {
                    text: 'Id',
                    dataIndex: 'category_id',
                    width: 50
                },{
                    text: 'Name',
                    dataIndex: 'name',
                    flex: 1
                }
            ]
        },*/

        search: {
            field: 'name',
            //bind: '{categories}'
            store: {
                //source: Ext.getStore('staticData.Categories')
                type: 'categories',
                autoLoad: true
            }
        }
    }]
});