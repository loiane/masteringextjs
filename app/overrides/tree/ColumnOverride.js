//From http://www.sencha.com/forum/showthread.php?281383-Glyph-support-on-treepanels
Ext.define('Packt.overrides.tree.ColumnOverride', {
    override: 'Ext.tree.Column',
    cellTpl: [
        '<tpl for="lines">',
        '<img src="{parent.blankUrl}" class="{parent.childCls} {parent.elbowCls}-img ',
        '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>" role="presentation"/>',
        '</tpl>',


        '<img src="{blankUrl}" class="{childCls} {elbowCls}-img {elbowCls}',
        '<tpl if="isLast">-end</tpl><tpl if="expandable">-plus {expanderCls}</tpl>" role="presentation"/>',
        '<tpl if="checked !== null">',
        '<input type="button" {ariaCellCheckboxAttr}',
        ' class="{childCls} {checkboxCls}<tpl if="checked"> {checkboxCls}-checked</tpl>"/>',
        '</tpl>',


        '<tpl if="glyph && glyphFontFamily">' ,
            '<span style="font-family:{glyphFontFamily};" class="{glyphCls}" role="presentation" >&#{glyph}</span> ',
        '<tpl else>',
            '<img src="{blankUrl}" role="presentation" class="{childCls} {baseIconCls} ',
            '{baseIconCls}-<tpl if="leaf">leaf<tpl else>parent</tpl> {iconCls}"',
            '<tpl if="icon">style="background-image:url({icon})"</tpl>/>',
        '</tpl>',
        '<tpl if="href">',
        '<a href="{href}" role="link" target="{hrefTarget}" class="{textCls} {childCls}">{value}</a>',
        '<tpl else>',
        '<span class="{textCls} {childCls}">{value}</span>',
        '</tpl>'
    ],
    initTemplateRendererData: function (value, metaData, record, rowIdx, colIdx, store, view) {
        var me = this,
            renderer = me.origRenderer,
            data = record.data,
            parent = record.parentNode,
            rootVisible = view.rootVisible,
            lines = [],
            parentData,
            glyph,
            glyphFontFamily,
            glyphParts;
        while (parent && (rootVisible || parent.data.depth > 0)) {
            parentData = parent.data;
            lines[rootVisible ? parentData.depth : parentData.depth - 1] =
                parentData.isLast ? 0 : 1;
            parent = parent.parentNode;
        }

        glyph = data.glyph;

        if (typeof glyph === 'string') {
            glyphParts = glyph.split('@');
            glyph = glyphParts[0];
            glyphFontFamily = glyphParts[1] || Ext._glyphFontFamily;
        }

        return {
            record: record,
            baseIconCls: me.iconCls,
            glyph: glyph,
            glyphCls: glyph ? data.glyphCls : '',
            glyphFontFamily: glyphFontFamily,
            iconCls: data.iconCls,
            icon: data.icon,
            checkboxCls: me.checkboxCls,
            checked: data.checked,
            elbowCls: me.elbowCls,
            expanderCls: me.expanderCls,
            textCls: me.textCls,
            leaf: data.leaf,
            expandable: record.isExpandable(),
            isLast: data.isLast,
            blankUrl: Ext.BLANK_IMAGE_URL,
            href: data.href,
            hrefTarget: data.hrefTarget,
            lines: lines,
            metaData: metaData,
            // subclasses or overrides can implement a getChildCls() method, which can
            // return an extra class to add to all of the cell's child elements (icon,
            // expander, elbow, checkbox).  This is used by the rtl override to add the
            // "x-rtl" class to these elements.
            childCls: me.getChildCls ? me.getChildCls() + ' ' : '',
            value: renderer ? renderer.apply(me.origScope, arguments) : value
        };
    }
});