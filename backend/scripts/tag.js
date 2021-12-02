//global chosen tag var and image var
var tag_chosen = "";
var oid = "";
$(document).ready(function (e) {
//I know there is duplicate code here but Javascript dependencies are a massive
//pain
		//global token variabke, get from persistent store

		try {
			token = JSON.parse(window.localStorage.getItem("chromashare-token"));
			//tries to update the account info w/ token
		} catch (ex) {
			token = "";
		}
		if (token == null) {
			token = "";
		}
		//gets tag oid
		oid = window.location.search.split("=")[1];
		//gets tag dataa
		tag_json = api_get('/api/tagdata', {"oid":oid});
		//displays tag
		$("#tag_carrier")[0].innerHTML += render_tag_pre(oid);
		//displays attached tags$("#tag_carrier")[0].innerHTML = "";
		for (i in tag_json.image_oids) {
			$("#image_carrier")[0].innerHTML += render_image_pre(tag_json.image_oids[i]);
		}
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
//tag preview with the just the name linking to the tag page
function render_tag_select(oid) {
	var result = api_get('/api/tagdata',{'oid':oid});
	tag_string = "<button id= \"add_tag\" onclick=\"tag_chosen='" +
		result._id +
		"'\">Add to: " +
		result.tag_name +
		"</button>";
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

