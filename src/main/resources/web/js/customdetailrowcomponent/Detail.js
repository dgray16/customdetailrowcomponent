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

    //getters
    $define: {
        contentStyle: function() {
            //this.$n()
            if(this.desktop) {
                //updated UI here.
            }
        },
        contentSclass: function() {
            if(this.desktop) {
                //updated UI here.
            }
        },
        open: function() {
            if(this.desktop) {
                //updated UI here.
            }
        }
    },

	bind_: function () {
		/**
		 * For widget lifecycle , the super bind_ should be called
		 * as FIRST STATEMENT in the function.
		 * DONT'T forget to call supers in bind_ , or you will get error.
		 */
		this.$supers(customdetailrowcomponent.Detail,'bind_', arguments);
	
		//A example for domListen_ , REMEMBER to do domUnlisten in unbind_.
		//this.domListen_(this.$n("cave"), "onClick", "_doItemsClick");
	},
	
	/*
		A example for domListen_ listener.
	*/
	/*
	_doItemsClick: function (evt) {
		alert("item click event fired");
	},
	*/
	unbind_: function () {
	
		// A example for domUnlisten_ , should be paired with bind_
		// this.domUnlisten_(this.$n("cave"), "onClick", "_doItemsClick");
		
		/*
		* For widget lifecycle , the super unbind_ should be called
		* as LAST STATEMENT in the function.
		*/
		this.$supers(customdetailrowcomponent.Detail,'unbind_', arguments);
	},
	
	getZclass: function () {
		return this._zclass != null ? this._zclass: "z-detail";
	}
});