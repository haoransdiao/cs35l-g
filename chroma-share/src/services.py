


from classes import Account


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
