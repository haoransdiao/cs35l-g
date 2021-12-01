import mongo_wrapper
import hashlib
from bson.objectid import ObjectId as oi
import random
#hashes a login and password
def hash( login_name, password):
	# salts the password
	salted = "saltyAagaash" + login_name + password
	#hashes with sha 256, which so far has not been broken
	password_hash = hashlib.sha256(salted.encode()) .hexdigest()
	#returns oid of token if successful, None otherwise
	return password_hash
def login( login_name, password):
	#databse wrapper
	mw = mongo_wrapper.MongoWrapper()
	try:
		print("Logging into:", login_name)
		#gets account info from loin name
		acc_json = mw.get_account_n(login_name)
		if acc_json == None:
			return None
		#checks the hash
		if hash(login_name, password) == acc_json['password_hash']:
			#if this is true, create and return a token
			token = mw.create_token(login_name, str(random.random()))
			#minor diffs between bson and json require
			# conversion
			token["_id"] = str(token["_id"])
			return token
		else:
			return None
	except:
		print("Failed to login: Exception\n")
		return None
#sees if the login described by token owns the tags/images described by oids
#the oid is not a string here
#token is in JSON format not BSON, so tje _id is a string
def authenticate(token, oids):
	#databse wrapper
	mw = mongo_wrapper.MongoWrapper()
	try: 
		#checks if the token is legit
		db_token = mw.get_token(oi(token['_id']))
		if db_token['login_name'] != token['login_name'] or db_token['random'] != token['random']:

				return False
		#checks if the oid is in the account id
		acc_json = mw.get_login_n(token['login_name'])
		# goes through each oid supplied, and checks for it in both
		# tokens and images, if it is not in any, return false
		for oid in oids:
			owned = False
			for t_oid in acc_json['token_oids']:
				if oid == t_oid:
					owned = True
			for i_oid in acc_json['image_oids']:
				if oid == i_oid:
					owned = True
			if owned == False:
				return False
		return True
			
	except:
		return False
