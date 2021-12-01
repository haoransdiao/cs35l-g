


from classes import Account
from classes import PhotoPost


from typing import List, Optional
import datetime
import bson



def create_account(username: str, email: str, password: str) -> Account:
    
    account = Account()
    account.username = username
    account.email = email
    account.password = password


    #puts it in database:
    account.save()


    return account




def find_account_by_username(username: str) -> Account:
    username = Account.objects(username=username).first()
    return username


def find_account_by_email(email: str) -> Account:
    account = Account.objects(email=email).first()
    return account




def upload_photo(active_account: Account, 
    title, notes, tags, is_public, photo_id) -> PhotoPost:

    photo = PhotoPost()

    photo.title = title
    photo.notes = notes
    photo.tags = tags
    photo.is_public = is_public
    photo.photo_id = photo_id

    photo.save()


    account = find_account_by_email(active_account.email)

    #account.photos.append(photo.id)
    account.photo_ids.append(photo.id)

    account.save()

    return photo




def find_photos_for_account(account: Account) -> List[PhotoPost]:
    
    #query = PhotoPost.objects(id__in=account.photos)
    query = PhotoPost.objects(id__in=account.photo_ids) 
    photos = list(query)

    return photos


