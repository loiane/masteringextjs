StartTest(function(t) {
    
    //==================================================================================================================================================================================
    t.diag("Siesta.Test creation")
    
    t.expectPass(function (t) {
        t.ok(true, 'True is ok')
        t.is(null, undefined, 'Null is undefined')
        t.is(1, "1", '1 is "1"')
        t.is(new Date(2010, 1, 1), new Date(2010, 1, 1), 't.is works for dates')
    })
    
    t.expectFail(function (t) {
        t.ok(false, 'False is not ok')
        t.is(null, NaN, 'Null is not a NaN')
        t.is(1, 2, '1 is not a 2')
        t.isDateEqual(new Date(2010, 1, 1), new Date(2010, 1, 2), 'isDateEqual fails ok')
    })
    
})