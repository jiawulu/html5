define(function(require, exports, module) {

	//h5 api
	var TBH5 = (function() {
		var H5 = {};
		var useLocalstorage = window.localStorage != null;
		console.log("can user localstorage = " + useLocalstorage);

		//类似于map的set方法，如果value不是string对象，会用JSON.stringify转化为string，存储到本地
		H5.set = function(key, value) {
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

		H5.add = function(key, value) {
			if(useLocalstorage) {
				if( typeof (value) == "string") {
					value = JSON.parse(value);
				} else {
					// JSON.parse
					try {
						$.extend(value, JSON.parse(H5.get(key)));
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
		H5.get = function(key) {
			if(useLocalstorage) {
				return window.localStorage.getItem(key);
			}
			return null;
		}
		return H5;
	})();
	
	exports.tbh5 = TBH5;

	//扩展tbh5
	(function(TBH5) {

		//获取数据监控埋点
		TBH5.getPds = function(element) {
			// console.log($);
			// console.log($('a'));
			// console.log($('[data-pds]'));
			// console.log($(element).parents('[data-pds]'));
			// console.log($(element).attr('data-pds'));
			var parents = $(element).parents('[data-pds]');
			var pds = '';
			for(var i = parents.length - 1; i >= 0; i--) {
				pds = pds + $(parents[i]).attr('data-pds') + "||";
			};
			var currentPds = $(element).attr('data-pds');
			console.log("current pds is " + currentPds);
			if(currentPds) {
				pds = pds + currentPds;
			} else {
				pds = pds.substring(0, pds.length - 2);
			}
			console.log(pds);
			return pds;
		}

/*
		$(document).ready(function() {
			console.log($('[data-pds]'));
			$('a[data-pds]').live('click', function() {
				TBH5.getPds(this);
			});
			$('button[data-pds]').live('click', function() {
				TBH5.getPds(this);
			});
			// $('button[data-pds]').live('click',TBH5.getPds(this));
		});*/

	})(TBH5);

});
