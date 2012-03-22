$.showOs = function() {
	//alert(navigator.userAgent)
	console.log($.os);
	console.log(navigator.userAgent);
	return this;
}

$.localSotrage = function() {
	if(window.localStorage) {
		console.log('This browser supports localStorage');
		//Do something with localStorage
		window.localStorage.myLocalKey = 'Local example';
		console.log(window.localStorage.myLocalKey);
	} else {
		alert('This browser does NOT support localStorage');
	}
}

$.middleJump = function() {
	var currentUrl = window.location.href;
	var appIds = ['sid', 'tks'];
	console.log(window.location.href)
	console.log(window.location.search)

	//TODO
	storageAppData();
	storageMonitorData();

	jump2StaticPage();

	function storageAppData() {
		console.log(currentUrl)

		//parse href
		var params = window.location.search;
		if(params) {
			var appData = {};
			var paramArray = params.split('&');
			for(var appId in appIds) {
				for(var param in paramArray) {
					if(param.indexOf(appId + '=') == 0) {
						var paramPair = param.split('=');
						appData[paramPair[0]] = paramPair[1];
						break;
					}
				};
			};

		}

	}

	function storageMonitorData() {
		//
	}

	function jump2StaticPage() {

	}

}
function test() {
	alert(appData);
}

function createImgs() {

	var imgTmp = '<a href="#" data-pds="5005">' + '<img src="http://q.i01.wimg.taobao.com/bao/uploaded/i1/T1SgWTXoVjXXahKXcY_024918.jpg_100x100.jpg" />' + '</a>';
	imgTmp = imgTmp + '<a href="#" onclick="TBH5.getPds(this)">' + '<img src="http://q.i01.wimg.taobao.com/bao/uploaded/i1/T1SgWTXoVjXXahKXcY_024918.jpg_100x100.jpg" />' + '</a>';

	$("#item_list").html(imgTmp);

}

function displayJsonValue() {
	var json = {
		'a' : 123,
		'b' : 456
	};
	console.log(JSON.stringify(json));
	var jsonStr = JSON.stringify(json);
	jsonStr = jsonStr.replace(/[|{|}|'|"]/g, '').replace(/:/g, '=').replace(/,/g, '&');
	console.log(jsonStr);
}

function testPropertyIn() {
	var cody = {
		age : 23,
		gender : 'male'
	};
	for(var key in cody) {// key is a variable used to represent each property name // avoid properties inherited from the prototype chain
		if(cody.hasOwnProperty(key)) {
			console.log(key);
		}
	}
}

var testV = 'a';
var testThis = {
	testV : 'b',
	func1 : function() {
		console.log(this.testV);
		// logs myObject
		var func2 = function() {
			console.log(this.testV)// logs window, and will do so from this point on
			var func3 = function() {
				console.log(this.testV);
				// logs window, as it’s the head object
			}();
		}();
	}
}