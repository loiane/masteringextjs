// also supports: startTest(function(t) {
StartTest(function(t) {
    t.diag("Sanity");

    t.ok(Ext, 'ExtJS is here');
    t.ok(Ext.Window, '.. indeed');


    t.ok(Packt, 'My project is here');
    t.ok(Packt.view.Login, '.. indeed');

    t.done();   // Optional, marks the correct exit point from the test
})    