/*
 Backbone.sync = function(method, model) {
 alert(method + ": " + model.url);
 };*/
$(function() {
var Item = Backbone.Model.extend({

});

var Items = Backbone.Collection.extend({
	url : 'items.json',
	model : Item
});

var items = new Items();

items.bind('reset', addAll, this);

function addAll() {
	console.log(items);
}

items.fetch();
})


