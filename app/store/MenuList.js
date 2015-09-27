Ext.define('MasteringExtJS.store.MenuList', {
    extend: 'Ext.data.TreeStore',

    storeId: 'MenuList',

    fields: [
        {
            name: 'text'
        }
    ],

    autoLoad: true,

    proxy: {
        type: 'ajax',
        //url: 'data/menu.json',
        url: 'http://localhost:8080/masteringextjs-java/menu/',
        reader: {
            type: 'json',
            transform: {
                fn: function(data) {

                    var transfData = [];

                    for (var i=0; i<data.data.length; i++){
                        var temp = {
                            id: data.data[i].id,
                            text: _(data.data[i].text),
                            iconCls: data.data[i].iconCls,
                            leaf: false,
                            //expanded: true,
                            children: []
                        };

                        for (var j=0; j<data.data[i].children.length; j++){
                            temp.children.push({
                                leaf: true,
                                id: data.data[i].children[j].id,
                                text: _(data.data[i].children[j].text),
                                iconCls: data.data[i].children[j].iconCls,
                                className: data.data[i].children[j].className,
                                routeId: data.data[i].children[j].routeId
                            });

                        }

                        transfData.push(temp);
                    }

                    return transfData;
                },
                scope: this
            }
        }
    }
});