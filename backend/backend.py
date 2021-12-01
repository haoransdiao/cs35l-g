#!/usr/bin/python3
import http.server as hs
#future https support, it's actually very easy to implement
import ssl
import json
#for mimetypes
import mimetypes
import base64
#opencv 2
import cv2

#this is our own mongodb wrapper
import mongo_wrapper


#Request handlers are an extension of the one from http.server
# get and [ost are handled with do_GET and do_POST
class RequestHandler(hs.BaseHTTPRequestHandler):
	#sends header information common to most GET responses
	def common_headers(self, ctype="text/html"):
		#http headers
		self.send_response(200, "OK")
		#makes sure the client knows this is utf-8
		self.send_header("Content-type", ctype + "; charset=utf-8")
		self.end_headers()
	#serves the file described by self.path, permissions are handled by
	#whatever calls this method
	def serve_file(self):
		#the path returned by http.server always has a leading / we do
		#not want
		filepath = self.path[1:]
		self.log_message("Serving file at os path %s",filepath )
		#file byte stream, declared here b/c it can't be in try:
		fd = None
		#tries to open the specified path, returns 404 otherwise
		try:
			#the b ensures that it reads bytes
			fd = open(filepath, "rb")
			#gets mimetype
			ctype = mimetypes.MimeTypes().guess_type(filepath)[0]
			self.common_headers(ctype)
			self.wfile.write(fd.read())
		except:
			self.log_message("Attempt to get %s failed", filepath)
			self.send_error(404, message="Could not Open/Find File")
			return

		#tries to close the file, fd should be valid but just in case
		try:
			fd.close()
		except:
			self.log_message("Could not close file %s",filepath)


	#handles page and api requests
	def do_GET(self):
		#request Handlers have its own log format seperate from a simple
		#print()
		self.log_message("Handling GET Request to path %s",self.path)
		#redirects to / for index.html
		if (self.path == "/index.html"):
			self.log_message("redirecting %s to /", self.path)
			self.send_response(301)
			self.send_header("Location", "/")
			self.end_headers()
		elif (self.path == "/"):
			#html headers
			self.common_headers()
			#actual content
			self.wfile.write(bytes("Index.html lmao","UTF-8"))

		#resort to serving a file if it's an actual page
		# split will result in '', filepath, so check 1 not 0
		elif (self.path.split("/")[1] == "imageraw"):
			self.serve_file()
		elif (self.path.split("/")[1] == "scripts"):
			self.serve_file()
		elif (self.path == "/aagaash.html"):
			self.serve_file()
		#404 Page
		else:
			#the parent class has built in error pages
			self.send_error(404,message="Lol path not found")
	#handles a POST request if it is an image upload
	def handle_upload(self, r):
		#instantiates a mongo wrapper
		mw = mongo_wrapper.MongoWrapper()
		#tries to read the json data ahd save as file
		try:
			self.log_message("Receiving file of type:%s", r['type'])
			self.log_message("Receiving file of title:%s", r['title'])
			#adds entry for this image in the database and gets the
			#oid
			oid = mw.add_image(r['type'],r['title'])
			if oid == None:
				raise Exception("failed to create image document in database")
			self.log_message("Object ID of image: %s", oid)
			#Getting the extension from mimetype
			extension = r['type'].split("/")[-1:][0]
			#TODO: making sure it's an image
			save_name = "imageraw/" + str(oid) + "." + extension
			self.log_message("Saving file to: %s", save_name)
			#ensures it writes as bytes
			save_handle = open(save_name, "wb")
			#decodes from base64
			byte_data = base64.b64decode(r['data'])
			#writes and closes
			save_handle.write(byte_data)
			save_handle.close()
		except:
			#technically this also excepts write errors
			self.send_error(400, message="malformed JSON")
			return

		#writes the image id in JSON
		self.common_headers("application/json")
		#returns image id in JSON
		self.wfile.write(bytes(json.dumps({"oid":str(oid)}),"UTF-8"))
	def handle_get_image(self, r):
		#instantiates a mongo wrapper
		mw = mongo_wrapper.MongoWrapper()
		#trues to parse json
		try:
			self.log_message("Retrieving data about image id %s", r['oid'])
			image_json = mw.get_image(r['oid'])
		except:
			self.send_error(400, message="malformed JSON")
			return
		#writes back the json data
		self.common_headers("application/json")
		self.wfile.write(bytes(image_json,"UTF-8"))

	#handles login and image uploads, as well as all other JSON requests
	def do_POST(self):
		#validate the POST request-----------------------------------
		#the header of a POST request contains information about its
		#length and content type, for more info, see:
		# https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
		self.log_message("Handling POST Request to path %s",self.path)
		##checks that it's the correct content type
		content_type = self.headers['content-type']
		if content_type != "application/json":
			self.log_message("Wrong Content Type")
			self.send_error(400, message="wrong content type")
			return
		#checks that it actually has a length
		content_length = self.headers['content-length']
		if content_length == None:
			self.log_message("no content length")
			self.send_error(400, message="POST Header has no content length")
			return
		self.log_message("content length: %s, content_type %s", content_length,content_type)

		#tries to parse json
		try:
			r = json.loads(self.rfile.read(int(content_length)))
		except:
			self.send_error(400, message="malformed JSON")
			return
		#Offloads processing of JSON Posts -------------------------
		#checks that it's the correct path
		if (self.path == "/uploadimage"):
			self.handle_upload(r)
		elif (self.path == "/api/imagedata"):
			self.handle_get_image(r)
			
		#if the POST isn't to login or upload an image, it is invalid
		else:
			self.send_error(404, message="POST path invalid")

def main():
	print("\033[33mStarting Up Backend Server\033[39m")
	#server daemon. Threaded version only available for Python 3.7+
	#port 443 is for https, which we will add later, but this also requires
	#root on most systems
	httpd = hs.ThreadingHTTPServer(('localhost',8000), RequestHandler)
	print("\033[33mhttpd class instantiated... starting serve loop\033[39m")
	#morbid method name lol
	httpd.serve_forever()

main()
