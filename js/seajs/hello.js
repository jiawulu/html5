define(function(require, exports, module) {

  console.log(module.id);
  exports.sayHello = function() {
  
    document.getElementById('out').innerHTML = 'Hello, SeaJS!';
  };

});
