import pymongo
class MongoWrapper():
	def __init__(self):
		# gets a client and connects to localhost, it doesn't actually
		# connect to anything until you try to add or get a document, so
		# no error checking needed
		self.mc = pymongo.MongoClient("localhost", 27017)
		self.db = self.mc['chromashare']
		self.imagedata = self.db["imagedata"]
		self.accounts = self.db["accounts"]
	#creates a new image document and returns the ObjectId as a string
	def add_image(self, mimetype, title):
		#                                        for now, the title and tag object ids are placeholders
		#tag object ids start as empty
		image_document = {
			"title": title,
			"type": mimetype,
			"tag_oids": [],
		}
		#if there is an error with the database, an exception will be
		# raised, in which case return None
		try:
			oid = self.imagedata.insert_one(image_document).inserted_id
			return oid
		except:
			return None




	def get_image(self, oid):
		try:
			image = self.imagedata.find_one({"_id": oid})
			return image
		except:
			return None



	def add_account(self, password_hash, login_name):


		existing_account = self.accounts.find_one({"login_name": login_name})
		#This method returns a single document matching a query (or None if there are no matches).
		if existing_account is not None:
			return

		account_document = {
			"login_name": login_name,
			"password_hash": password_hash,
		}

		try:
			oid = self.accounts.insert_one(account_document).inserted_id
			return oid
		except:
			return None


	#add a tag to an image
	def add_tag_to_image(self, oid, tag_oid):
		#find image using query by _id
		find_image = {"_id": oid}

		tags = {'$push': {'tag_oids': tag_oid}}

		self.imagedata.update_one(find_image, tags)




