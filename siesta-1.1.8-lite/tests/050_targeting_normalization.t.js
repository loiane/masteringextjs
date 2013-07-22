StartTest(function(t) {

    document.body.innerHTML = '<div style="width:50px;height:50px;"><div style="width:40px;height:40px;" class="inner"></div></div>';

    var div = document.body.firstChild;
    var innerDiv = document.body.firstChild.firstChild;
    var context = t.getNormalizedTopElementInfo(div);

    t.isDeeply(context, {
        el : innerDiv,
        xy : [25, 25]
    }, 'Targeting outer div results in the inner div');
})