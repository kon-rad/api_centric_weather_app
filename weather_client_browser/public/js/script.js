$(document).ready(function(){


var weather_api = "http://localhost:8000?callback=?";

function httpGetAsync(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", theUrl, true); // true is for async
	xmlHttp.send(null);
}

function displayResult(data) {
	document.getElementById('display').innerHTML = json;
}

$("#weather_btn").click(function() {
	console.log("clicked");
	$.ajax({
		type:"GET",
		dataType:"jsonp",
		url: "http://localhost:8000/1234?callback=?",
		success: function(data) {
			console.log("works");
			console.log(data);
			$('#display').text(data);
		}

	});
});

	
})