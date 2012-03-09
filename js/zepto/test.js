$.showOs = function(){
	//alert(navigator.userAgent)
	console.log($.os);
	console.log(navigator.userAgent);
	return this;
}

$.localSotrage = function(){	
	 if (window.localStorage) {
      console.log('This browser supports localStorage');
      //Do something with localStorage
      window.localStorage.myLocalKey = 'Local example';
      console.log(window.localStorage.myLocalKey);
    } else {
      alert('This browser does NOT support localStorage');
    }
    
    window.localStorage.setItem('hello','world');
}

  // display the contents of a storage event
  function displayStorageEvent(e) {
  	alert(e)
    var logged = "key:" + e.key + ", newValue:" + e.newValue + ", oldValue:" +
                 e.oldValue +", url:" + e.url + ", storageArea:" + e.storageArea;

    alert('EVENT: ' + logged);
  }

  // add a storage event listener for this origin
  window.addEventListener("storage", displayStorageEvent, true);