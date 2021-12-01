'''
import mongoengine

def global_init():
    mongoengine.register_connection()



from mongoengine import connect


from pymongo import MongoClient
'''



'''
import mongoengine


alias_core = 'core'
db = 'chromashare-db'

data = dict(
    alias=DEFAULT_CONNECTION_NAME,
    name=db_name,
    host=db_host,
    port=db_port,
    username=db_user,
    password=db_pass,
    read_preference=ReadPreference.NEAREST,
    authentication_source=db_name,

)

def global_init():
    mongoengine.register_connection()
'''

'''
from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://chromashare.asmjs.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"
)
'''








import mongoengine


from mongoengine import connect
#connect(host="mongodb+srv://chromashare.asmjs.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority")
# ^ the URI from the chromashare mongoDB site



def global_init():
    connect(host="mongodb+srv://chromashare.asmjs.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority")
    # ^ the URI from the chromashare mongoDB site






'''
from pymongo import MongoClient
uri = "mongodb+srv://chromashare.asmjs.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"
client = MongoClient(uri,
                     tls=True,
                     tlsCertificateKeyFile='<path_to_certificate>')
db = client['testDB']
collection = db['testCol']
doc_count = collection.count_documents({})
print(doc_count)
'''