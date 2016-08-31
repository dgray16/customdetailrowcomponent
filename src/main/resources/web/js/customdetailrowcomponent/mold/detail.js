/**
* Here's the mold file , a mold means a HTML struct that the widget really presented.
* yep, we build html in Javascript , that make it more clear and powerful.
*/
function (out) {
    var zcls = this.getZclass(),
        uuid = this.uuid;

    out.push('<div ', this.domAttrs_(), '>');
    out.push('<div id="', uuid, '-img" class="', zcls, '-img"></div>');

    out.push('<div id="', uuid, '-cave" style="', this._contentStyle,
            ';display:none;" class="', this._contentSclass, '">');

    for (var w = this.firstChild; w; w = w.nextSibling)
        w.redraw(out);

    out.push('</div></div>');
}