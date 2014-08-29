Ext.define('Packt.view.login.CapsLockTooltip', {
    extend: 'Ext.tip.QuickTip',

    xtype: 'capslocktooltip',

    target: 'password',
    anchor: 'top',
    anchorOffset: 0,
    width: 300,
    dismissDelay: 0,
    autoHide: false,
    title: '<div class="fa fa-exclamation-triangle"> Caps Lock is On</div>',
    html: '<div>Having Caps Lock on may cause you to enter ' +
        'your password incorrectly.</div><br/>' +
        '<div>You should press Caps Lock to turn it off ' +
        'before entering your password.</div>'
});