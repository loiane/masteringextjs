var Harness = Siesta.Harness.Browser.ExtJS;

Harness.configure({
    title       : 'Mastering Ext JS Test Suite',

    preload     : [
        '../extjs/resources/css/ext-all.css',
        '../resources/css/app.css',

        '../extjs/ext-all.js',
        '../app.js'
    ]
});

Harness.start(
    '010_sanity.t.js',
    '020_basic.t.js'
);