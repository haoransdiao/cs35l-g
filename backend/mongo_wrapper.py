import pymongo
class MongoWrapper():
	def __init__(self):
		# gets a client and connects to localhost, it doesn't actually
		# connect to anything until you try to add or get a document, so
		# no error checking needed
		self.mc = pymongo.MongoClient("localhost", 27017)
		self.db = self.mc['chromashare']
		self.imagedata = self.db["imagedata"]
	#creates a new image document and returns the ObjectId as a string
	def add_image(self, mimetype):
		#for now, the title and tag object ids are placeholders
		image_document = {
			"title": "Placeholder",
			"type": mimetype,
			"tag_oids": ["a","b"],
		}
		#if there is an error with the database, an exception will be
		# raised, in which case return None
		try:
			oid = self.imagedata.insert_one(image_document).inserted_id
			return oid
		except:
			return None