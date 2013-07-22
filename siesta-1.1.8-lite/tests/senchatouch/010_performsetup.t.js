StartTest(function (t) {
    // When using 'black box' testing approach, we should not try to perform another setup
    // (i.e. performSetup should be automatically set to false)
    t.getTouchHarness({
        performSetup    : true
    }, [
        {
            hostPageUrl     : 'senchatouch/010_performsetup.html',
            url             : 'senchatouch/010_performsetup.js'
        }
    ]);

    var descr           = Harness.getScriptDescriptor('senchatouch/010_performsetup.js');
    
    var testStarted     = false
    
    Harness.on('teststart', function (event) {
        testStarted     = true
        
        t.notOk(event.source.performSetup, "Perform setup should be set to `false` when `hostPageUrl` is given")
    })

    t.beginAsync();
    Harness.on('testsuiteend', function() {
        t.ok(testStarted, "Test has started")
        t.pass('Test suite finalized as expected');
        t.endAsync();
    })

    Harness.launch([ descr ]);
});
