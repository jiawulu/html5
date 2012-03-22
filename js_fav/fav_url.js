define(function(require, exports, module) {

	var uri = require('uriBroker');

	//定义的dps，通过下面的extend方法，合并到uriBroker中的配置表中
	// myTB 对应于开发出去的getUrl api中的 module名字，对于mtop的请求，因为url的路径一致，
	// 所以规则是 module_methodName.toLowerCase()
	var fav_dps = {
		myTB : "mytaobao##fav",
		detail : "detail##fav",
		shop : "shop##fav",
		fav_item : "item##fav",
		fav_shop : "shop##fav",
		mtop_querycolgood : "queryColGood##fav",
	}
	$.extend(uri.URL_CONSTANTS.dps, fav_dps);

	//定义链接的path路径，也是通过module来取
	var fav_path = {
		fav_item : 'favItem.htm',
		fav_shop : 'favShop.htm',
		mtop : 'rest/api2.do'
	}
	$.extend(uri.URL_CONSTANTS.path, fav_path);

	//定义mtop的默认参数
	uri.defaultMtopParam = {
		callback : '?',
		api : 'com.taobao.wap.rest2.fav',
		type : 'jsonp',
		v : '*'
	}

	exports.getUrl = function(module, param) {
		//TODO  处理额外的dps，同一个path，不同的dps
		return uri.getUrl(module, param);
	}
	/**
	 example:
	 window.localStorage.setItem('TAOBAO_APP_PARAM',JSON.stringify({sid:123456,ttid:123456}));
	 seajs.use('fav_url', function(fav_url) {
	 console.log(fav_url);
	 console.log(fav_url.getUrl('detail',{itemId:123456}));
	 //fav是host fav_shop是path
	 console.log(fav_url.getUrl('fav_shop'));
	 console.log(fav_url.getUrl('fav_item'));
	 console.log(fav_url.getUrl('shop',{shopId:123456}));
	 console.log(fav_url.getUrl('mtop'));
	 console.log(fav_url.getUrl('mtop_queryColGood'));
	 console.log(fav_url.getUrl('mtop_queryColGood',{}));
	 console.log(fav_url.getUrl('mtop',{method:'queryColGood'}));
	 });
	 */

});
