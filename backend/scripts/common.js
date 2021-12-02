
//I know there is duplicate code here but Javascript dependencies are a massive
//pain
		//global token variabke, get from persistent store

		try {
			token = JSON.parse(window.localStorage.getItem("chromashare-token"));
			//tries to update the account info w/ token
			account_update(token.login_name);
		} catch (ex) {
			token = "";
		}
		if (token == null) {
			token = "";
		}
$(document).ready(function (e) {
		// Create Login -----------------------------------------
		$('#cl').on('click', async function() {
			var login_name = $('#login_name').prop('value');
			var password = $('#password').prop('value');
			req_json = JSON.stringify({
				'login_name': login_name, 
				'password': password
			});
			$.post({
				url: '/api/createlogin',
				contentType: 'application/json', //type of
				//content posted
				dataType: 'json',//what to expect back from the server
				data: req_json,
				success: function() {
					alert("Login Successfully Created!");
				},
				error: function (result) {
					alert("Registration Failed");
				},
			});
		});
		// Login -----------------------------------------
		$('#login').on('click', async function() {
			var login_name = $('#login_name').prop('value');
			var password = $('#password').prop('value');
			req_json = JSON.stringify({
				'login_name': login_name, 
				'password': password
			});
			$.post({
				url: '/api/login',
				contentType: 'application/json', //type of
				//content posted
				dataType: 'json',//what to expect back from the server
				data: req_json,
				success: function (result) {
					console.log(result)
					token = result;
					window.localStorage.setItem(
						"chromashare-token",
						JSON.stringify(token)
					);
					account_update(token.login_name);
				},
				error: function (result) {
					alert("Login Failed");
				},
			});
		});
		// Signout implmentation ------------------------------
		$("#signout").on('click', function() {
			window.localStorage.removeItem("chromashare-token");
			location.reload();
		});
});
//tag preview with the just the name linking to the tag page
function render_tag_pre(oid) {
	result = api_get('/api/tagdata',{'oid':oid});
	tag_string = "<a href=\"/build/tag.html?oid=" +
		result._id +
		"\">" +
		result.tag_name +
		"</a>";
	console.log(tag_string);
	return tag_string;
		//carrier = $("#tag_carrier")[0].innerHTML;
		//$("#tag_carrier")[0].innerHTML = carrier + title_e;
}
function api_get (url, req) {
	var result_return;
	req_json = JSON.stringify(req);
	$.post({
		url: url,
		contentType: 'application/json', //type of
		//content posted
		dataType: 'json',//what to expect back from the server
		data: req_json,
		//makes sure this is now async
		async: false,
		success: function(result) {
			result_return = result;
		}
	});
	return result_return;
}
//Image preview with just title and image, links to image page
function render_image_pre (oid) {
	result = api_get('/api/imagedata', {'oid':oid});
	console.log(result);
	//gets the file extension
	extension = result.type.split("/");
	extension = extension.slice(-1);
	extension = extension[0];
	console.log(extension);
	//generates image element to insert
	//link
	image_string  = "<a href=\"/build/image.html?oid=" +
		result._id +
		"\">" +
		//image
		"<img class=\"image_box\" src=\"/imageraw/" + 
		result._id +
		"." +
		extension + 
		"\"/>"+
		//title
		"<p>Title: " +
		result.title +
		"</p>" +
		//a tag ends
		"</a>";
	console.log(image_string);
	return image_string;
};
	//appends to the image carrier element
//	carrier = $("#image_carrier")[0].innerHTML;
//	$("#image_carrier")[0].innerHTML = carrier + image_string;
//}
function display_image(oid) {
	req_json = JSON.stringify({'oid': oid});
	$.post({
		url: '/api/imagedata',
		contentType: 'application/json', //type of
		//content posted
		dataType: 'json',//what to expect back from the server
		data: req_json,
		success: display_image_callback
	});
}
function display_images(image_oids) {
	for (i in image_oids) {
		display_image(image_oids[i]);
	}
}
function account_update(login_name) {
	req_json = JSON.stringify({'login_name': login_name});
	$.post({
		url: '/api/accdatan',
		contentType: 'application/json', //type of
		//content posted
		dataType: 'json',//what to expect back from the server
		data: req_json, 
		success: function (result) {
			console.log(result);
			$("#login-display")[0].textContent = result.login_name;	
		},
	});
}
