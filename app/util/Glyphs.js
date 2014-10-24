Ext.define('Packt.util.Glyphs', {
    singleton: true,

    config: {
        webFont: 'FontAwesome',
        add: 'xf067',
        edit: 'xf040',
        destroy: 'xf1f8',
        save: 'xf00c',
        cancel: 'xf0e2',
        saveAll: 'xf0c7',
        clearFilter: 'xf0b0',
        groupCountry: 'xf0ac',
        film: 'xf1c8',
        actor: 'xf005',
        category: 'xf013',
        searchAndAdd: 'xf1e5',
        clear: 'xf12d',
        print: 'xf02f',
        pdf: 'xf1c1',
        excel: 'xf1c3',

        menuReports: 'xf1fe',
        chartPie: 'xf200',
        chartBar: 'xf080',
        chartColumn: 'xf201 ',
        download: 'xf0ed',
        image: 'xf1c5',
        svg: 'xf1c9'
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    getGlyph : function(glyph) {
        var me = this,
            font = me.getWebFont();
        if (typeof me.config[glyph] === 'undefined') {
            return false;
        }
        return me.config[glyph] + '@' + font;
    }
});