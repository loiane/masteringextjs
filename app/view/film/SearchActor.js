Ext.define('Packt.view.film.SearchActor', {
    extend: 'Packt.view.sakila.SearchWindow',
    alias: 'widget.searchactor',

    width: 600,
    bodyPadding: 10,
    layout: {
        type: 'anchor'
    },
    title: 'Search and Add Actor',

    items: [
        {
            xtype: 'combo',
            store: 'film.SearchActors',
            displayField: 'first_name',
            valueField: 'actor_id',
            typeAhead: false,
            hideLabel: true,
            hideTrigger:true,
            anchor: '100%',
            minChars: 2,

            displayTpl: new Ext.XTemplate(
                '<tpl for=".">' +
                    '{[typeof values === "string" ? values : values["last_name"]]}, ' +
                    '{[typeof values === "string" ? values : values["first_name"]]}' +
                '</tpl>'
            ),

            listConfig: {
                loadingText: 'Searching...',
                emptyText: 'No matching posts found.',

                // Custom rendering template for each item
                getInnerTpl: function() {
                    return '<h3><span>{last_name}, {first_name}</span></h3></br>' +
                        '{film_info}';
                }
            },
            pageSize: 2
        }, {
            xtype: 'component',
            style: 'margin-top:10px',
            html: 'Live search requires a minimum of 2 characters.'
        }
    ]
});