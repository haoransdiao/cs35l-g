#!/usr/bin/python3.7
import http.server as hs
#future https support, it's actually very easy to implement
import ssl

#Request handlers are an extension of the one from http.server
# get and [ost are handled with do_GET and do_POST
class RequestHandler(hs.BaseHTTPRequestHandler):
	#sends header information common to most GET responses
	def common_headers(self):
		#http headers
		self.send_response(200, "OK")
		#makes sure the client knows this is utf-8
		self.send_header("Content-type", "text/html; charset=utf-8")
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
			fd = open(filepath, "r")
			self.common_headers()
			self.wfile.write(bytes(fd.read(), "UTF-8"))
		except:
			self.log_message("Attempt to get %s failed", filepath)
			self.send_error(404, message="Could not Open/Find File")
			return

		#tries to close the file, fd should be valid but just in case
		try:
			fd.close()
		except:
			self.log_message("Could not close file %s",filepath)


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
		elif (self.path == "/aagaash.html"):
			self.serve_file()
		#404 Page
		else:
			#the parent class has built in error pages
			self.send_error(404,message="Lol path not found")


def main():
	print("\033[33mStarting Up Backend Server\033[39m")
	#server daemon. Threaded version only available for Python 3.7+
	#port 443 is for https, which we will add later, but this also requires
	#root on most systems
	httpd = hs.ThreadingHTTPServer(('localhost',443), RequestHandler)
	print("\033[33mhttpd class instantiated... starting serve loop\033[39m")
	#morbid method name lol
	httpd.serve_forever()

main()
