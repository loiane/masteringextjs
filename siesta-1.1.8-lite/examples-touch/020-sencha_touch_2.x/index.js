var Harness = Siesta.Harness.Browser.SenchaTouch;

Harness.configure({
    title     : 'Sencha Touch 2 samples',

    preload : [
        "../../../sencha-touch-2.1.0/resources/css/sencha-touch.css",
        "../../../sencha-touch-2.1.0/sencha-touch-all-debug.js"
    ]
});

Harness.start(
    {
        url : '010_map.t.js',
        performSetup : false,       // This is done by the maps example itself
        overrideSetTimeout : false,
        alsoPreload : [
            "http://maps.google.com/maps/api/js?sensor=true",
            "../../../sencha-touch-2.1.0/examples/map/app.js",
            "../../../sencha-touch-2.1.0/examples/map/lib/plugin/google/Tracker.js",
            "../../../sencha-touch-2.1.0/examples/map/lib/plugin/google/Traffic.js",
        ]
    },
    '011_carousel.t.js',
    '012_form.t.js',
    '013_buttons.t.js',
    '014_events.t.js',
    '015_nested_list.t.js',
    '016_contact_list.t.js',
    '017_tabs.t.js'
        
);
// eof Harness.start

