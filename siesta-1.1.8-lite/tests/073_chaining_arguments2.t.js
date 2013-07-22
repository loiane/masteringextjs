StartTest(function(t) {
    
    t.testExtJS(function (t) {
        var btn = new Ext.Button({ id : 'bar', renderTo : Ext.getBody() });
        
        t.chain(
            {
                action  : 'click',
                target  : function() { return '#bar'; }
            },
            function (next, previousTarget) {
                t.is(previousTarget, btn.el.dom, 'Button element was passed to next fn');
            }
        )
    });
});
