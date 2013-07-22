var Harness = Siesta.Harness.Browser.ExtJS;

Harness.configure({
    title     : 'Sencha Ext JS examples',

    preload : [
        "http://cdn.sencha.io/ext-4.1.1-gpl/resources/css/ext-all.css",
        "http://cdn.sencha.io/ext-4.1.1-gpl/ext-all-debug.js"
    ]
});


Harness.start(
    '010_ext-bug.t.js',
    '015_ext-combo.t.js',
    {
        url : '020_ext-custom-combo.t.js'
    },
    {
        url : '030_ext-resize.t.js',
        
        // can specify an *additional* preloads (only for tests, not for groups)
        alsoPreload : [
            'http://cdn.sencha.io/ext-4.1.1-gpl/examples/draw/Sencha.js'
        ]
    },
    '040_ext-window.t.js',
    '050_ext-ajax.t.js',
    '060_extjs_targeting_buttons.t.js'
);

