var Harness = Siesta.Harness.Browser.SenchaTouch;

Harness.configure({
    title               : 'All-in-one Siesta Examples for Sencha Touch',
    transparentEx       : false
});

// NOTE: This harness assumes you have a local Sencha Touch 2.x SDK at the same place as your Siesta folder.

Harness.start(
    {
        group : 'Sencha Touch 2.x',

        // Load these files for each ST 2.0 test
        preload : [
            "../../sencha-touch-2.1.0/resources/css/sencha-touch.css",
            "../../sencha-touch-2.1.0/sencha-touch-all-debug.js"
        ],
        items : [
            {
                url : '020-sencha_touch_2.x/010_map.t.js',
                overrideSetTimeout : false,
                performSetup : false,       // This is done by the maps example itself
                alsoPreload : [
                    "http://maps.google.com/maps/api/js?sensor=true",
                    "../../sencha-touch-2.1.0/examples/map/app.js",
                    "../../sencha-touch-2.1.0/examples/map/lib/plugin/google/Tracker.js",
                    "../../sencha-touch-2.1.0/examples/map/lib/plugin/google/Traffic.js"
                ]
            },
            {
                url : '020-sencha_touch_2.x/011_carousel.t.js',
                alsoPreload : [
                    "020-sencha_touch_2.x/011_carousel.t.css"
                ]
            },
            '020-sencha_touch_2.x/012_form.t.js',
            '020-sencha_touch_2.x/013_buttons.t.js',
            '020-sencha_touch_2.x/014_events.t.js',
            '020-sencha_touch_2.x/015_nested_list.t.js',
            '020-sencha_touch_2.x/016_contact_list.t.js',
            '020-sencha_touch_2.x/017_tabs.t.js'
        ]
    }
);
// eof Harness.start

