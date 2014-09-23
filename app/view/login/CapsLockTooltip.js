Ext.define('Packt.view.login.CapsLockTooltip', {
    extend: 'Ext.tip.QuickTip',

    xtype: 'capslocktooltip',

    target: 'password',
    anchor: 'top',
    anchorOffset: 0,
    width: 300,
    dismissDelay: 0,
    autoHide: false,
    title: '<div class="fa fa-exclamation-triangle">'+ translations.capsLockTitle + '</div>',
    html: '<div>'+ translations.capsLockMsg1 +
        translations.capsLockMsg2 + '</div><br/>' +
        '<div>'+ translations.capsLockMsg3 +
        translations.capsLockMsg4 + '</div>'

});
