/**
* CDN URI
* @getImg	: get picture url.
* @getLogo	: get logo url.
* @author	: yanyuan
* @date		: 2012-03-16
*/
define(function(require, exports, module){
		var config = require('config');

		var _sys			= config.sysType || 'm';
		var _placeHolder	= '${machine}';
		var _imgSubPath		= '/bao/uploaded/';
		var _imgTestHost	= 'http://img0'+_placeHolder+'.daily.taobaocdn.net';
		var _imgHost		= 'http://q.i0'+_placeHolder+'.wimg.taobao.com';
		var _logoTestHost	= 'http://logo.daily.taobao.net';
		var _logoHost		= 'http://logo.taobaocdn.com';
		var _logoSubPath	= '/shop-logo/';
		var _m = 4;
		var _logoType = 1, _imgType = 2;

		// ~~~ public method begin ~~~
		
		/**
		* getImg
		* @name		: [MUST]pic name from server.
		* @height	: [OPTIONAL]pic height.
		* @width	: [OPTIONAL]pic width.
		* @n		: [OPTIONAL]if you input ,it will be used to choose cdn.
		*/
		exports.getImg = function (name, height, width, n) {
			return _buildUrl(_imgType, name, _imgSubPath , height, width, n);
		}
		
		/**
		* getLogo
		* @name		: [MUST]pic name from server.
		* @height	: [OPTIONAL]pic height.
		* @width	: [OPTIONAL]pic width.
		* @n		: [OPTIONAL]if you input ,it will be used to choose cdn.
		*/
		exports.getLogo = function (name, height, width, n) {
			return _buildUrl(_logoType, name, _logoSubPath, height, width, n);
		}

		// ~~~ public method end ~~~

		// --- private method begin ---

		function _buildUrl(type, name, path, height, width, n) {
			if (!name)
			{
				return 'http://a.tbcdn.cn/mw/s/common/icons/nopic/nopic-'+height+'.png';
			}

			if (type == _logoType)
			{
				return _getLogoHost() + _logoSubPath + name + fix(height, width);
			} else {
				var machineNo = _chooseCDN(name, n);
				return _getImgHost (machineNo).replace('${machine}', machineNo) + _imgSubPath + name + fix(height, width);
			}
		}

		function fix (height, width) {
			return '_' + (height || 80) + 'x' + (width || 80) +'.jpg';
		}

		function _chooseCDN (name, n) {
			var machineNo = -1;
			if (null != n && n.toString().match('[0-9]'))
			{
				machineNo = n % _m;
			}
			
			if (-1 == machineNo)
			{
				if (name.match('^i[0-9].*'))
				{
					machineNo = parseInt(name.charAt(1)) % _m;
				} else {
					var reg = name.match('([^/]*)\.jpg');
					
					if (null != reg && '' != reg && reg.length > 1)
					{	
						var length = reg[1].length;
						var code = reg[1].charCodeAt(0) + reg[1].charCodeAt(length-1);
						machineNo = code % _m;
					} else {
						machineNo = name.charCodeAt(0) % _m;
					}
				}
			}
			
			if (0 == machineNo)
			{
				machineNo += 1;
			}

			return machineNo;
		}

		function _getImgHost () {
			if (_isTest())
			{
				return _imgTestHost;
			} else {
				return _imgHost;
			}
		}

		function _getLogoHost() {
			if (_isTest()) {
				return _logoTestHost;
			} else {
				return _logoHost;
			}
		}

		function _isTest() {
			return 'waptest' == _sys;
		}

		// --- private method end ---
});