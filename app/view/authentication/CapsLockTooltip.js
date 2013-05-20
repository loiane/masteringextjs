Ext.define('Packt.view.authentication.CapsLockTooltip', {
    extend: 'Ext.tip.QuickTip',
    alias: 'widget.capslocktooltip',

    target: 'password',
    anchor: 'top',
    anchorOffset: 0,
    width: 300,
    dismissDelay: 0,
    autoHide: false,
    title: '<div class="capslock">'+ translations.capsLockTitle + '</div>',
    html: '<div>'+ translations.capsLockMsg1 + '</div>' +
        '<div>'+ translations.capsLockMsg2 + '</div><br/>' +
        '<div>'+ translations.capsLockMsg3 + '</div>' +
        '<div>'+ translations.capsLockMsg4 + '</div>'
});