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
		self.tokens = self.db['tokens']
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
			raise Exception("login already exists")
			return None

		account_document = {
			"login_name": login_name,
			"password_hash": password_hash,
			"tag_oids": [],
			"image_oids": [],
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
	


	def add_image_histogram(self, oid, hist_id):

		#update image to reflect the histogram:

		find_image = {"_id": oid}     #find image using query by _id
		update_histogram = {"$set": {"histogram": hist_id}}

		self.imagedata.update_one(find_image, update_histogram)

	

	def get_image_histogram(self, oid):

		image = self.imagedata.find_one({"_id": oid})

		histogram = image["histogram"]

		return histogram
	


	def get_account(self, account_id):

		try:
			account = self.accounts.find_one({"_id": account_id})
			return account
		except:
			return None

	#gets the account by login name
	def get_account_n(self, login_name):

		try:
			account = self.accounts.find_one({"login_name":login_name})
			return account
		except:
			return None
	#creates a new token, then return the token json
	def create_token(self, login_name, random):
		token_document = {
			"login_name": login_name,
			"random": random
		}

		try:
			token_id = self.tokens.insert_one(token_document).inserted_id
			return self.tokens.find_one({"_id": token_id})
		except:
			return None
	# gets a token
	def get_token(self, oid):

		try:
			token = self.tokens.find_one({"_id":oid})
			return token
		except:
			return None

	def get_tag(self, tag_id):

		try:
			tag = self.tags.find_one({"_id": tag_id})
			return tag
		except:
			return None

	

	def add_image_to_account(self, account_id, oid):

		#update account to reflect the image:

		find_account = {"_id": account_id}     #find account using query by _id
		update_images = {'$push': {"image_oids": oid}}

		self.accounts.update_one(find_account, update_images)
	


	def add_tag_to_account(self, account_id, tag_id):

		#update account to reflect the tag:

		find_account = {"_id": account_id}     #find account using query by _id
		update_tags = {'$push': {"tag_oids": tag_id}}

		self.accounts.update_one(find_account, update_tags)









