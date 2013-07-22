StartTest(function(t) {
    
    var win = new Ext.Window({
        height : 200,
        width : 200,
        // Set window position to known state
        x     : 10,      
        y     : 10
    });
    
    win.show();

    t.ok(win.rendered, 'The window is rendered');
    
    t.hasSize(win, 200, 200, 'Correct initial size');

    t.dragBy(win.down('header'), [20, 20], function() {
        
        t.dragBy(win.getEl().down('.x-resizable-handle-east'), [20, 0], function() {
            t.hasSize(win, 220, 200, 'Size increased');
            
            t.click(win.down('tool[type=close]'));
        
            t.notOk(win.el, 'The dom element of the window is gone');
        });
    });
});