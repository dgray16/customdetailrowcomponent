/**
 *
 * Base naming rule:
 * The stuff start with "_" means private , end with "_" means protect ,
 * others mean public.
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
 * so we use it to determine whether we need to update view
 * manually in setter or not.
 * If this.desktop exist , means it's after mold rendering.
 *
 */
customdetailrowcomponent.Detail = zk.$extends(zul.Widget, {
    //private attributes
    _contentStyle: '',
    _contentSclass: '',
    _open: false,

    //setters
    $define: {
        contentStyle: function() {
            if(this.desktop) {
                this.$n('cave').css(_contentStyle);
            }
        },
        contentSclass: function() {
            if(this.desktop) {
                this.$n('cave').attr('class',_contentSclass);
            }
        },
        open: function() {
            if(this.desktop) {
                this.open(this._open);
            }
        }
    },

    //open or close the detail row
    open: function (open, silent) {
    },

    //open event handler
    _doOpen: function (evt) {
        //we just change the value of the open property,
        //the setter will do the rest
        this.set('open', !this.get('open'));
    },

    bind_: function () {
        this.$supers(customdetailrowcomponent.Detail,'bind_', arguments);
        //set open listener
        this.domListen_(this.$n('img'), "onClick", "_doOpen");
    },

    unbind_: function () {
        this.domUnlisten_(this.$n('img'), "onClick", "_doOpen");
        this.$supers(customdetailrowcomponent.Detail,'unbind_', arguments);
    },
	
	getZclass: function () {
		return this._zclass != null ? this._zclass: "z-detail";
	}
});