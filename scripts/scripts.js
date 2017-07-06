/**
 * Created by ryanm on 04/07/17.
 */

function loadFirstOption(element){
	//Set arrow
	var arrowHTML = '<div id="arrow" class="arrow" style="left:11%;">&#9660;</div>';
    document.getElementsByClassName("active")[0].outerHTML = ''+ document.getElementsByClassName("active")[0].outerHTML +  arrowHTML +'';
    makeCorsRequest(element);
    document.getElementById('option1').classList.add("active");
}


// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
        xhr.setRequestHeader("Accept", "application/json");
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(element) {
    // This is a sample server that supports CORS.
    var url = 'http://api.joind.in/v2.1/talks/'+element.getAttribute('data-id')+'';
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        var apiResponse =  JSON.parse(xhr.responseText);
        var apiData = apiResponse.talks[0];
        var html = '';
        for(var key in apiData){
            html = html + '<div class="row"><label class="api-row-label">'+key+'</label><span class="api-row-value">'+apiData[key]+'</span></div>'
        }
        document.getElementById('api-text-box').innerHTML =html;
    };
    xhr.onerror = function() {
        alert('There was an error making the request.');
    };
    xhr.send();
    setActive(document.getElementsByClassName("component-menu-item"),element);
}

function setActive(allElements,activeElement){
    for(var i=0;i<allElements.length;i++){
        allElements[i].classList.remove("active");
    }
    activeElement.classList.add("active");
    var left = calculateArrowPos(activeElement);
	document.getElementById('arrow').style.left = ""+left+"%";
}

function calculateArrowPos(activeElement){
	var inst = activeElement.getAttribute('data-instance');
	var ratio = 0;
	var left = 0;
	switch(parseInt(inst)){
		case 1: left = 12; break;
		case 2: left = 36; break;
		case 3: left = 60; break;
		case 4: left = 84; break;
		default: break;
	}
	return left;
}
