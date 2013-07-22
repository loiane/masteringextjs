StartTest(function(t) {
    
	//==================================================================================================================================================================================
    t.diag("Siesta.Test.More methods")

    
    //==================================================================================================================================================================================
    t.diag("WaitFor")
    
    var test        = t.getGenericTest({}, true)
    
    var async       = t.beginAsync()
    
    var counter     = 0 
    
    test.waitFor(
        function () {
            return counter++ > 2
        }, 
        function () {
            t.pass("Reached wait condition")
            
            cont()
        }
    )
    
    var cont = function () {
        
        test.waitFor(
            function () {
            }, 
            function () {
                t.fail("Should never reach this")
            },
            null,
            200
        )
        
        setTimeout(function () {
            
            t.is(test.results.length, 2, 'An assertion was added - Timeout was detected')
            t.notOk(test.results[ 1 ].passed, "and its a failing assertion")
            
            
            var test2        = t.getGenericTest({}, true)
            
            test2.waitFor(
                function () {
                    throw 'wtf';
                }, 
                function () {
                    t.fail("Should never get here")
                }
            )
            
            t.is(test2.results.length, 1, 'An assertion was added - Exception was detected')
            t.notOk(test2.results[ 0 ].passed, "and its a failing assertion")
            
            
            t.endAsync(async)
            
        }, 500)
    }
})
