


import mongo_setup as mongo_setup

import services as svc

import state as state





def main():
    
    #calls the function to connect to mongoDB database
    mongo_setup.global_init()

    
    #print("Welcome to ChromaShare!")





def create_account():
    

    username = input('Enter username: ')

    old_account = svc.find_account_by_username(username)
    if old_account:
        print(f"ERROR: Account with username {username} already exists.")
        return


    email = ('Enter email: ')

    old_account = svc.find_account_by_email(email)
    if old_account:
        print(f"ERROR: Account with email {email} already exists.")
        return


    password = input('Choose your password: ')



    state.active_account = svc.create_account(username, email, password)


    print(f"Created new account with id {state.active_account.id}.")




def log_in_to_account():


    username = input('Enter username: ')

    account = svc.find_account_by_username(username)

    if not account:
        print(f'Could not find account with username {username}.')
        return


    state.active_account = account


    password = input('Enter password: ')

    if account.password is not password:
        print(f'Incorrect password.')
        return
    


    #state.active_account = account
    print('Logged in successfully.')

