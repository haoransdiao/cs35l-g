


from typing import Optional

from classes import Account
import services as svc

active_account: Optional[Account] = None


def reload_account():
    global active_account
    if not active_account:
        return

    active_account = svc.find_account_by_email(active_account.email)