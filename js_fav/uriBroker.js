define(function(require, exports, module) {

	var config = require('config');
	var uri = require('uri');
	var tbh5 = require('h5_base')

	exports.URL_CONSTANTS = URL_CONSTANTS = {
		//可以继续定义一些通用的规则...
		path : {
			myTB : 'myTaobao.htm',
			detail : 'iITEM_ID.htm',
			shop : 'shop/shop_index.htm'
		},
		dps : {
		},
		app_param_key : 'TAOBAO_APP_PARAM'
	}

	
	function rebuildPath(path,params){	
		//detail相关
		if(path == URL_CONSTANTS.path.detail) {
			path = path.replace("ITEM_ID", function() {
				var itemId = params.itemId;
				if(_checkIsBlank(itemId)) {
					throw "itemId is null"
				}
				delete params.itemId;
				return itemId;
			});
		};
		return (path || '');	
	}
	
	/**
	 * module：对应于 URL_CONSTANTS 中的key，如果一个模块下面有多个功能名，那么module为模块名 + 功能名。
	 *   模块名的取名规则很简单
	 *     如 http://shop.m.taobao.com/shop/shop_index.htm?shop_id=****
	 *    那么模块名就位 shop , 对应与域名 shop.m.taobao.com.
	 * 
	 *     如果店铺下面有2个功能模块，比如： http://shop.m.taobao.com/shop/shop_auction_search.htm
	 *    host依然为shop，但是为了区分各自不同的path，对应于URL_CONSTANTS.path , 我们可以把module定义为 shop_search
	 * 
	 * param对应于对象，用于各个业务链接的参数
	 *    如：详情的 : {itemId:123456}
	 *        店铺的 : {shopId:123456}
	 *       指向tmall域名的 {domain:'tmall'}
	 *       api 参数的 ：{
				'method'		: 'queryColPromoGood',
				'currentPage'	: currentPage,
				'pageSize'		: pageSize,
				'startRow'		: startRow
			}
	 *    
	 */
	exports.getUrl = function(module, param) {
		module = module.toLowerCase();
		param = param || {};
		var domain = param.domain;
		if(domain) {
			delete param.domain;
		} else {
			domain = "taobao";
		}

		var _modules = module.split("_");
		var host = uri.createURI(_modules[0]);
		if(!host) {
			throw "module param is not current,can't match any host";
		};

		switch (_modules[0]) {
			case "mtop" :
				var _param = {};
				setMtopDps(module,param,_param);
				_param.data = JSON.stringify(param);
				//TODO  可以在此细分api的名字
				$.extend(_param, this.defaultMtopParam);
				var path = URL_CONSTANTS.path[module];
				//return new UriBroker(host, _param, path).render();
				return uri.renderURI(host, '', _param, path, domain); 
			default :
				//TODO multi path
				setDps(module,param);
				var path = URL_CONSTANTS.path[module];
				return uri.renderURI(host, '', param, path, domain);
		}
		
		function setMtopDps(module,param,_param){
			if (!param['dps']) {
				var method = param.method;
				var dps_key = module;
				if(method) {
					dps_key += ("_" + method.toLowerCase());
				}
				var dps = URL_CONSTANTS.dps[dps_key];
				dps && (_param['dps'] = dps);
			}	
		}
		
		function setDps(module,param){
			if (!param['dps']) {
				var dps = URL_CONSTANTS.dps[module];
				dps && (param['dps'] = dps);
			}
		}
	}
	
});
