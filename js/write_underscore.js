// Underscore骨骼
(function() {
	var root = this;

	var breaker = {};

	var ArrayProto = Array.prototype, ObjProto = Object.prototype;

	var nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeFilter = ArrayProto.filter, nativeKeys = Object.keys;

	var slice = ArrayProto.slice, unshift = ArrayProto.unshift, hasOwnProperty = ObjProto.hasOwnProperty;

	// 构造函数
	var _ = function(obj) {
		return new wrapper(obj);
	};
	// 向全局暴露接口
	root._ = _;

	// 类型检测
	_.isNumber = function(obj) {
		return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
	};
	_.isFunction = function(obj) {
		return !!(obj && obj.constructor && obj.call && obj.apply);
	};
	// 遍历扩展
	var each = _.each = _.forEach = function(obj, iterator, context) {
		if(obj === null)
			return;

		if(nativeForEach && obj.forEach === nativeForEach) {
			obj.forEach(iterator, context);
		} else if(_.isNumber(obj.length)) {
			for(var i = 0, l = obj.length; i < l; i++) {
				if(iterator.call(context, obj[i], i, obj) === breaker)
					return;
			}
		} else {
			for(var key in obj) {
				if(hasOwnProperty.call(obj, key)) {
					if(iterator.call(context, obj[key], key, obj) === breaker)
						return;
				}
			}
		}
	};
	// 返回对象上面的函数名
	_.functions = _.methods = function(obj) {
		return _.filter(_.keys(obj), function(key) {
			return _.isFunction(obj[key])
		}).sort();
	};
	// 过滤数组
	_.filter = _.select = function(obj, iterator, context) {
		var results = [];
		if(obj == null)
			return results;
		if(nativeFilter && obj.filter === nativeFilter)
			return obj.filter(iterator, context);

		each(obj, function(value, index, list) {
			if(iterator.call(context, value, index, list))
				results[results.length] = value;
		});
		return results;
	};
	// 获取key值
	_.keys = nativeKeys ||
	function(obj) {
		if(obj !== Object(obj))
			throw new TypeError('Invalid object');
		var keys = [];
		for(var key in obj)
		if(hasOwnProperty.call(obj, key))
			keys[keys.length] = key;
		return keys;
	};

	// 用于实验的map方法
	_.map = function(obj, iterator, context) {
		var results = [];
		if(obj == null)
			return results;
		if(nativeMap && obj.map === nativeMap)
			return obj.map(iterator, context);
		each(obj, function(value, index, list) {
			results[results.length] = iterator.call(context, value, index, list);
		});
		return results;
	};
	// 链式操作主要部分
	var wrapper = function(obj) {
		this._wrapped = obj;
	};

	_.prototype = wrapper.prototype;

	// 扩展自定义方法到Wrap包装器上
	_.mixin = function(obj) {
		each(_.functions(obj), function(name) {
			addToWrapper(name, _[name] = obj[name]);
		});
	};
	// 是否对结果进行链式包装返回
	var result = function(obj, chain) {
		return chain ? _(obj).chain() : obj;
	};
	// 将方法扩展到包装器的原型上
	var addToWrapper = function(name, func) {
		wrapper.prototype[name] = function() {
			//将arguments转化为array，arguments是object的对象
			//就是因为 arguments 不是真的组数，typeof arguments==="Object" 而不是 "Array"
			//它没有slice这个方法，通过这么Array.prototype.slice.call调用，JS的内部机制应该是 把arguments对象转化为Array
			//因为Array.prototype.slice.call调用后，返回的是一个组数
			var args = slice.call(arguments);
			unshift.call(args, this._wrapped);
			//just like _(this._wrapped).func(arguments)
			return result(func.apply(_, args), this._chain);
		};
	};
	// 将所有Underscore上的方法添加到Wrap包装器上
	_.mixin(_);

	// 扩展Array上的方法到wrap包装器上-包装原数组
	each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
		var method = ArrayProto[name];
		wrapper.prototype[name] = function() {
			method.apply(this._wrapped, arguments);
			return result(this._wrapped, this._chain);
		};
	});
	// 扩展Array上的方法到wrap包装器上-包装返回值
	each(['concat', 'join', 'slice'], function(name) {
		var method = ArrayProto[name];
		wrapper.prototype[name] = function() {
			return result(method.apply(this._wrapped, arguments), this._chain);
		};
	});
	// 添加链式方法的实现
	wrapper.prototype.chain = function() {
		this._chain = true;
		return this;
	};
	// 提取链式包装的内容
	wrapper.prototype.value = function() {
		return this._wrapped;
	};
})();
