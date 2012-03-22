define(function(require, exports, module){
		var uriModule = require('uri');
		
		// extends subUri
		uriModule.subUri.mtop = uriModule.createURI('api');

		var defaultParam = {
			callback	: '?',
			api			: 'com.taobao.wap.rest2.fav',
			type		: 'jsonp',
			v			: '*'
		}

		exports.queryColGood = function (cateId, tag, currentPage, pageSize, domain) {
			var param = defaultParam;
			param.data = JSON.stringify({
				'method'		: 'queryColGood',
				'cateId'		: cateId,
				'tag'			: encodeURIComponent(tag),
				'currentPage'	: currentPage,
				'pageSize'		: pageSize
			});

			return _favRender(param, domain);
		}

		exports.queryColPromoGood = function (currentPage, pageSize, startRow, domain) {
			var param = defaultParam;
			param.data = JSON.stringify({
				'method'		: 'queryColPromoGood',
				'currentPage'	: currentPage,
				'pageSize'		: pageSize,
				'startRow'		: startRow
			}); 

			return _favRender(param, domain);
		}

		exports.queryColShop = function (cateId, tag, currentPage, pageSize, actCount, goodCount, domain) {
			var param = defaultParam;
			param.data = JSON.stringify({
				'method'		: 'queryColShop',
				'cateId'		: cateId,
				'tag'			: encodeURIComponent(tag),
				'currentPage'	: currentPage,
				'pageSize'		: pageSize,
				'actCount'		: actCount,
				'goodCount'		: goodCount
			}); 

			return _favRender(param, domain);
		}

		exports.queryColActShop = function (currentPage, pageSize, startRow, actCount, domain) {
			var param = defaultParam;
			param.data = JSON.stringify({
				'method'		: 'queryColActShop',
				'currentPage'	: currentPage,
				'pageSize'		: pageSize,
				'actCount'		: actCount,
				'startRow'		: startRow
			}); 

			return _favRender(param, domain);
		}

		exports.queryColNewGoodShop = function (currentPage, pageSize, startRow, goodCount, domain) {
			var param = defaultParam;
			param.data = JSON.stringify({
				'method'		: 'queryColNewGoodShop',
				'currentPage'	: currentPage,
				'pageSize'		: pageSize,
				'startRow'		: startRow,
				'goodCount'		: goodCount
			}); 

			return _favRender(param, domain);
		}

		exports.queryColGoodCateFilter = function (domain) {
			return _geneWithMethod('queryColGoodCateFilter', domain);
		}

		exports.queryColGoodTagFilter = function (domain) {
			return _geneWithMethod('queryColGoodTagFilter', domain);
		}

		exports.queryColShopCateFilter = function (domain) {
			return _geneWithMethod('queryColShopCateFilter', domain);
		}

		exports.queryColShopTagFilter = function (domain) {
			return _geneWithMethod('queryColShopTagFilter', domain);
		}

		exports.delColShop = function (id, domain) {
			var param = defaultParam;
			param.data = JSON.stringify({
				'method'		: 'delColShop',
				'id'			: id
			}); 

			return _favRender(param, domain);
		}

		exports.delColGood = function (id, domain) {
			var param = defaultParam;
			param.data = JSON.stringify({
				'method'		: 'delColGood',
				'id'			: id
			}); 

			return _favRender(param, domain);
		}

		function _favRender (param, domain) {
			return uriModule.renderURI(uriModule.subUri.mtop, 'api2.do', param, 'rest', domain);
		}

		function _geneWithMethod(method, domain) {
			var param = defaultParam;
			param.data = JSON.stringify({
				'method'		: method
			}); 

			return _favRender(param, domain);
		}
});