


$(document).ready(function (e) {
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
		// Random photo redirect
		$("#r_photo").on('click', function() {
			var account = api_get('/api/accdatan',{'login_name': token.login_name});
			var candidates = account.image_oids;
			var oid = candidates[Math.floor(Math.random()*candidates.length)];
			redirect = "/build/image.html?oid=" + oid;
			window.location.replace(redirect);
		});
		// Create Tag -----------------------------------------
		$('#ctg').on('click', async function() {
			var title = $('#tgtitle').prop('value');
			req_json = JSON.stringify({
				'title': title,
				'token': token,
			});
			$.post({
				url: 'api/createtag',
				contentType: 'application/json', //type of
				//content posted
				dataType: 'json',//what to expect back from the server
				data: req_json,
				success: function (result) {
					alert("Upload successful!");
					account_update(token.login_name);
				},
				error: function (result) {
					alert("failed to uplaod file");
				},
			});
		});
		//UPLOAD IMAGE ----------------------------------------
		$('#imup').on('click', async function() {
			//handles only one file
			var image_file = $('#imfile').prop('files')[0];
			//we want to convert the image from whatever convoluted
			//format JS natively uses to a base64 encoding that
			//JQuery can pass along as json
			var image_b = await image_file.arrayBuffer();
			//uint8 array
			var image_c = new Uint8Array(image_b);
			//console.log(image_c);
			//uint8 to string
			var image_d = String.fromCharCode.apply(null, image_c);
			
			//console.log(image_d);
			var image_b64 = btoa(image_d);
			//console.log(image_b64);
			var image_type = image_file.type;

			//gets image title
			var image_title = $('#imtitle').prop('value')
			image_json = JSON.stringify({
				'title': image_title,
				'type': image_type,
				'data': image_b64,
				'token': token
			});
			//console.log(image_json);
			$.post({
				url: 'uploadimage',
				contentType: 'application/json', //type of
				//content posted
				dataType: 'json',//what to expect back from the server
				data: image_json,
				success: function (result) {
					alert("tag created successfully!");
					account_update(token.login_name);
				},
				error: function (result) {
					alert("failed to create tag");
				},
			});
		});

});
//tag preview with the just the name linking to the tag page
function render_tag_pre(oid) {
	var result = api_get('/api/tagdata',{'oid':oid});
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
	var result = api_get('/api/imagedata', {'oid':oid});
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
function account_update(login_name) {
	if (token != "") {
		var account = api_get('/api/accdatan',{'login_name': token.login_name});
		//tags
		$("#tag_carrier")[0].innerHTML = "";
		for (i in account.tag_oids) {
			$("#tag_carrier")[0].innerHTML += render_tag_pre(account.tag_oids[i]);
		}
		//images
		$("#image_carrier")[0].innerHTML = "";
		for (j in account.image_oids) {
			$("#image_carrier")[0].innerHTML += render_image_pre(account.image_oids[j]);
		}
		//login name
		$("#login-display")[0].textContent = account.login_name;	
	}
}
