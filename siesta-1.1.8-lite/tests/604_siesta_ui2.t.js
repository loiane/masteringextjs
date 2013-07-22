StartTest(function(t) {
    t.getHarness([
        { 
            group : 'foo',
            items : [
                '601_siesta_ui_passing.t.js',
                '601_siesta_ui_passing.t.js?foo',
                '601_siesta_ui_passing.t.js?foo2',
                '601_siesta_ui_passing.t.js?foo3'
            ]
        }
    ]);
    
    t.chain(
        { 
            desc            : 'Should find testgrid CQ', 
            waitFor         : 'compositeQuery', 
            args            : ['testgrid => .x-grid-row'] 
        },
        { 
            action          : 'doubleclick', 
            target          : 'testgrid => .x-grid-row'
        },
        { 
            desc            : 'Should be able to run group of tests', 
            waitFor         : 'harnessEvent', 
            args            : 'testsuiteend' 
        },
        {   waitFor         : 500 },
        { 
            action          : 'doubleclick', 
            target          : 'testgrid => .x-grid-row'
        }, 
        { 
            desc            : 'Should be able to run group of tests twice', 
            waitFor         : 'harnessEvent', 
            args            : 'testsuiteend' 
        }
    );
});