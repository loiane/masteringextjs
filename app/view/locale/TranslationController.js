Ext.define('Packt.view.locale.TranslationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.translation',

    init: function() {
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en',
            button = this.getView();

        button.setIconCls(lang);

        if (lang == 'en'){
            button.setText('English');
        } else if (lang == 'es'){
            button.setText('Español');
        } else {
            button.setText('Português');
        }
    },

    onMenuItemClick: function(item, e, options){

        var menu = this.getView();

        menu.setIconCls(item.iconCls);
        menu.setText(item.text);

        localStorage.setItem("user-lang", item.iconCls);

        window.location.reload();
    }
});