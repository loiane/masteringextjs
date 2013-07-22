StartTest(function(t) {
    t.getHarness(['IE6_TEST']);
    
    t.chain(
        { 
            desc            : 'Should find testgrid CQ', 
            waitFor         : 'CQ', 
            args            : ['testgrid'] 
        },
        { 
            desc            : 'Should find IE text', 
            waitFor         : 'contentLike', 
            args            : ['>>testgrid', 'IE6_TEST'] 
        },
        { 
            desc            : 'Should click trigger field', 
            action          : 'click', 
            target          : '>>testgrid triggerfield' 
        },
        { 
            desc            : 'Should type into filter field', 
            action          : 'type', 
            target          : '>>testgrid triggerfield',
            text            : 'FOO' 
        },
        { 
            desc            : 'Should not find IE6 text after filtering', 
            waitFor         : 'contentNotLike', 
            args            : ['>>testgrid', 'IE6_TEST'] 
        },
        { 
            desc            : 'Should click clear trigger', 
            action          : 'click', 
            target          : 'testgrid => .x-form-trigger' 
        },
        { 
            desc            : 'Should find IE6 after clearing filter', 
            waitFor         : 'contentLike', 
            args            : ['>>testgrid', 'IE6']
        }
    );
});