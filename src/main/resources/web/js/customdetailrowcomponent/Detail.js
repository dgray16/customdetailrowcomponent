/**
 * Base naming rule:
 * The stuff start with "_" means private , end with "_" means protect , others mean public.
 *
 * All the member field should be private.
 *
 * Life cycle: (It's very important to know when we bind the event)
 * A widget will do this by order :
 * 1. $init
 * 2. set attributes (setters)
 * 3. rendering mold (@see mold/customdetailrowcomponent.js )
 * 4. call bind_ to bind the event to dom .
 *
 * this.deskop will be assigned after super bind_ is called,
 * so we use it to determine whether we need to update view manually in setter or not.
 * If this.desktop exist , means it's after mold rendering.
 */
customdetailrowcomponent.Detail = zk.$extends(zul.Widget, {
    // Private attributes
    _contentStyle: '',
    _contentSclass: '',
    _open: false,

    // Setters
    $define: {
        contentStyle: function() {
            if (this.desktop) {
                this.$n('cave').css(_contentStyle);
            }
        },
        contentSclass: function() {
            if (this.desktop) {
                this.$n('cave').attr('class',_contentSclass);
            }
        },
        open: function() {
            if (this.desktop) {
                this.open(this._open);
            }
        }
    },

    // Open or close the detail row
    open: function (open) {
        console.log("I am here");
        var cmp = this.$n();
        if (cmp) {
            var cls = this.getZclass();
            jq(cmp)[open ? "addClass" : "removeClass"](cls + "-expd");
            if (open) {

                /* 
                 * After migration from ZK5 to ZK8, tr.rowIndex started to return 0, but should be 1.
                 * It makes influence on order of components to be expanded.
                 */
                var td = jq(cmp).parents('td'),
                    cave = this.$n("cave"),
                    tr = this.parent.$n(),
                    fake = tr.parentNode.insertRow(tr.rowIndex + 1),
                    cell = fake.insertCell(0);
                
                jq(fake).attr('id', this.uuid + "-fake");
                jq(cell).attr('colSpan', tr.cells.length);

                jq(fake).addClass(cls + "-faker");
                jq(td).attr('rowSpan', 2);
                jq(cell).append(cave);
                jq(cave).show();
            } else {
                var td = jq(cmp).parents('td'),
                    cave = this.$n('cave'),
                    tr = this.parent.$n(),
                    fake = this.$n('fake');

                jq(cave).hide();
                jq(cmp).append(cave);
                jq(td).attr('rowSpan', 1);
                jq(fake).remove();
            }
        }
    },

    // Open event handler
    _doOpen: function () {
        // We just change the value of the open property, the setter will do the rest
        this.set('open', !this.get('open'));

        // Send onOpen event to the server side component
        zAu.send(new zk.Event(this, 'onOpen', {open : this.get('open')}));
    },

    bind_: function () {
        this.$supers(customdetailrowcomponent.Detail,'bind_', arguments);
        // Set open listener
        this.domListen_(this.$n('img'), "onClick", "_doOpen");

        // If the detail is open by refault, run open method
        if(this.get('open'))
            this.open(true);

        // Assign correct class to the td that wraps the detailrow
        jq(this.$n()).parents('td').attr('class', this.getZclass()+'-outer');
    },

    unbind_: function () {
        this.domUnlisten_(this.$n('img'), "onClick", "_doOpen");
        this.$supers(customdetailrowcomponent.Detail,'unbind_', arguments);
    },
	
	getZclass: function () {
		return this._zclass != null ? this._zclass: "z-detailrow";
	}
});