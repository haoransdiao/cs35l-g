

import mongoengine

import datetime



class PhotoPost(mongoengine.EmbeddedDocument):
    
    #-----------------------------------------------------------------------------------
    '''

    file =

    '''

    title = mongoengine.StringField()

    notes = mongoengine.StringField()

    #---------------------------------------------------------------------------------
    author = mongoengine.StringField()

    tags = mongoengine.ListField()

    timestamp = mongoengine.DateTimeField(default=datetime.datetime.now)

    is_public = mongoengine.BooleanField(required=True)


    photo_id = mongoengine.IntField()


    #to communicate with database:
    meta = {
        #'db_alias': 'core',
        'collection': 'photo-posts'
    }





class Account(mongoengine.Document):

    username = mongoengine.StringField(required=True)
    email = mongoengine.StringField(required=True)
    password = mongoengine.StringField(required=True)


    photos = mongoengine.EmbeddedDocumentListField(PhotoPost)
    photo_ids = mongoengine.ListField()


    tags = mongoengine.ListField()


    #to communicate with database:
    meta = {
        #'db_alias': 'core',
        'collection': 'accounts'
    }