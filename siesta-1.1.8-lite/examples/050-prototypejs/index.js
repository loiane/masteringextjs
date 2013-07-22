var Harness = Siesta.Harness.Browser.ExtJS

Harness.configure({
    title     : 'Awesome Test Suite',
    
    preload : [
        "prototype.js"
    ]
})


Harness.start(
    'hello_world.t.js'
)

