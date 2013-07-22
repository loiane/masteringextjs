StartTest(function(t) {
    t.diag("Siesta.Test.More chaining")

    t.testBrowser(function (t) {
        var document = t.global.document;
        
        t.ok(
            t.analyzeChainStep(function (next) { next++; }),
            'Correctly found usage of 1st argument in step function'
        )
        
        t.ok(
            t.analyzeChainStep(function ( next ) { next++; }),
            'Correctly found usage of 1st argument in step function'
        )        
        
        t.ok(
            t.analyzeChainStep(function (abc123_11, zxc, zz) { abc123_11++; }),
            'Correctly found usage of 1st argument in step function'
        )
        
        t.notOk(
            t.analyzeChainStep(function funcName() { next() }),
            'Correctly found the absence of usage of 1st argument in step function'
        )
        
        t.notOk(
            t.analyzeChainStep(function funcName(next) { var a = 1 }),
            'Correctly found the absence of usage of 1st argument in step function'
        )
        

        t.chain(
            function (next) {
                t.is(arguments.length, 1, 'Only 1 argument for 1st step')
                
                next(1, 1, 2)
            },
            function (next) {
                t.is(arguments.length, 4, '4 arguments for 2nd step')
                
                t.isDeeply(Array.prototype.slice.call(arguments, 1), [ 1, 1, 2 ], 'Correct arguments received from previous step' )
                    
                // not just `setTimeout(next, 100)` because in FF, next will receive 1 argument
                setTimeout(function () {
                    next()
                }, 100)
            },
            function (next) {
                document.body.innerHTML = '<span id="foo" class="foo">bar</span>';
                t.is(arguments.length, 1, '1 argument')
                next()
            },

            { waitFor : 'selector', args : ['span.foo'] },
            
            function (next, prevResult) {
                t.is(arguments.length, 2, '2 arguments')
                t.is(prevResult[0], document.getElementById('foo'), 'Correct arg passed to next fn')
                next()
            },

            { action : 'click', target : document.body },

            function (next, prevResult) {
                t.is(arguments.length, 2, '2 arguments')
                //t.is(prevResult[0], document.body, 'Correct arg passed to next fn')
            }
        )
    })
    
})
