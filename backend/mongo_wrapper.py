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
		self.tags = self.db["tags"]
	#creates a new image document and returns the ObjectId as a string
	def add_image(self, mimetype, title):
		#tag object ids and histogram start as empty
		image_document = {
			"title": title,
			"type": mimetype,
			"tag_oids": [],
			"histogram": "",
		}
		#if there is an error with the database, an exception will be
		# raised, in which case return None
		try:
			oid = self.imagedata.insert_one(image_document).inserted_id
			return oid
		except:
			return None



	def create_tag(self, tag_name):

		tag_document = {
			"tag_name": tag_name,
			"image_oids": []
		}

		try:
			tag_id = self.tags.insert_one(tag_document).inserted_id
			return tag_id
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

		#update image to reflect the tag:

		find_image = {"_id": oid}     #find image using query by _id
		update_tags = {'$push': {'tag_oids': tag_oid}}

		self.imagedata.update_one(find_image, update_tags)

		#and update the tag to reflect the associated image:

		find_tag = {"_id": tag_oid}
		update_images = {'$push': {'image_oids': oid}}

		self.tags.update_one(find_tag, update_images)







