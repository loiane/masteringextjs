StartTest(function(t) {
    var button = new Ext.Button({
        renderTo    : Ext.getBody()
    });

    t.willFireNTimes(button, 'click', 1);

    t.click(button);
});
