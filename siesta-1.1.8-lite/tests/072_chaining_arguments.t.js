StartTest(function(t) {
    
    t.testExtJS(function (t) {
        var btn = new Ext.Button({ cls : 'foo', renderTo : Ext.getBody() });
        
        t.chain(
            {
                action  : 'click',
                target  : '>>button[cls=foo]'
            },
            function (next, previousTarget) {
                t.is(previousTarget, btn, 'Button reference was passed to next fn');
                next();
            },
            {
                action  : 'click',
                target  : btn
            },
            function (next, previousTarget) {
                t.is(previousTarget, btn, 'Button reference was passed to next fn');
                next();
            },
            {
                action  : 'click',
                target  : [50,50]
            },
            function (next, previousTarget) {
                t.is(previousTarget, document.body, 'BODY el reference was passed to next fn');
                next();
            },
            {
                action  : 'click',
                target  : '.foo' 
            },
            function (next, previousTarget) {
                t.is(previousTarget, btn.el.dom, 'button el reference was passed to next fn');
                next();
            }
        )
    });
});
