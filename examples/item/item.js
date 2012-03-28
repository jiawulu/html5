$(function() {

	/*
	 Backbone.sync = function(method, model) {
	 alert(method + ": " + model.url);
	 };*/

	var Item = Backbone.Model.extend({

	});

	var Items = Backbone.Collection.extend({
		//定义fetch的url
		url : 'items.json',
		model : Item
	});

	var items = new Items();

	// The DOM element for a todo item...
	var ItemView = Backbone.View.extend({

		//... is a list tag.
		tagName : "li",

		// Cache the template function for a single item.
		template : _.template($('#item-template').html()),

		// The DOM events specific to an item.
		events : {
			"click" : "toggleClick",
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize : function() {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},
		// Re-render the titles of the todo item.
		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		// Toggle the `"done"` state of the model.
		toggleClick : function() {
			this.model.destroy();
			//this.remove()
			//console.log(this.model.destroy());
		}
	});

	// Our overall **AppView** is the top-level piece of UI.
	var AppView = Backbone.View.extend({

		el : $("#items"),

		initialize : function() {
			console.log("init app view");
			items.bind('reset', this.addAll, this);
			items.fetch();
		},
		
		render : function() {
			console.log("render app view");
		},
		
		addAll : function() {
			items.each(function(item) {
				//$("#items").append(_.template($('#item-template').html())(item.toJSON()));
				var view = new ItemView({
					model : item
				});
				this.$("#items").append(view.render().el);
			});
		}
	});

	var App = new AppView;

	var AppRouter = Backbone.Router.extend({
		routes : {
			"deleteme" : "deleteMe"
		},
		deleteMe : function() {
			console.log($(this).html())
		}
	});
	// Instantiate the router
	var app_router = new AppRouter;
	// Start Backbone history a neccesary step for bookmarkable URL's
	Backbone.history.start();

})