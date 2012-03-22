/**
* global configuration
* 
* @sysType : check system type , m or wapa or waptest
*
* @author  : yanyuan
* @date	   : 2012-03-16
*/
define(function(require, exports, module){
	// loading
	{
		var _checkSysType = '';
		if(window.location.host.match('.*\\.waptest\\.(taobao|tmall|etao|alibaba|alipay|aliyun)\\.com.*')){
			_checkSysType = 'waptest';
		} else if (window.location.host.match('.*\\.wapa\\.(taobao|tmall|etao|alibaba|alipay|aliyun)\\.com.*'))
		{
			_checkSysType = 'wapa';
		}
	}
	
	// system type , m or wapa or waptest
	exports.sysType = _checkSysType || 'm';
});