var Harness = Siesta.Harness.Browser.ExtJS

Harness.configure({
    title     : 'Awesome Test Suite',
    
    preload : [
        'http://cdn.sencha.io/ext-4.1.1-gpl/resources/css/ext-all.css',
        'http://cdn.sencha.io/ext-4.1.1-gpl/ext-all-debug.js',
        
        'preload.js'
    ]
})


Harness.start(
    '010_sanity.t.js',
    '020_basics.t.js'
)

