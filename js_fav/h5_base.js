//h5 api
define(function(require, exports, module){
	
	exports.useLocalstorage = useLocalstorage = window.localStorage != null;
	
	//类似于map的set方法，如果value不是string对象，会用JSON.stringify转化为string，存储到本地
	exports.set = function(key, value) {
		if(useLocalstorage) {
			if( typeof (value) != "string") {
				value = JSON.stringify(value);
				// JSON.parse
			};
			window.localStorage.setItem(key, value);
			return true;
		}
		return false;
	}

	exports.add = function(key, value) {
		if(useLocalstorage) {
			if( typeof (value) == "string") {
				value = JSON.parse(value);
			} else {
				// JSON.parse
				try {
					$.extend(value, JSON.parse(getValue(key)));
				} catch(e) {
					console.log(e);
				}
				value = JSON.stringify(value);
			}
			window.localStorage.setItem(key, value);
			return true;
		}
		return false;
	}
	
	//简单的做了一个window.localStorage.getItem 映射
	exports.get = getValue = function(key) {
		if(useLocalstorage) {
			return window.localStorage.getItem(key);
		}
		return null;
	}
	
})