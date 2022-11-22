import pytz
from schemas.sqlalchemy import (DatabaseUserCredentials)
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

async def create_new_user(db: Session, data):

    new_suffix = 1
    
    try:
        email_exist = await does_email_exist(db, data)
        if email_exist[0] is not None:
            return "Already Exist."
    except Exception:
        pass

    try:
        user_data = await get_user_highest_prefix(db, data)
        if data.username == user_data[0]:
            new_suffix = user_data[2] + new_suffix
    except Exception:
        pass

    database_user = DatabaseUserCredentials(
        username=data.username,
        email=data.email,
        username_suffix=new_suffix,
        password=data.password,
    )

    db.add(database_user)
    db.commit()
    db.refresh(database_user)

    return "Created."

async def get_user_from_db(db: Session, data):
    email = data.email
    data = db.query(DatabaseUserCredentials).filter(DatabaseUserCredentials.email.ilike(email)).first()
    return data

async def get_user_highest_prefix(db: Session, data):
    username = data.username
    data = db.query(DatabaseUserCredentials.username, DatabaseUserCredentials.email, func.max(DatabaseUserCredentials.username_suffix)).group_by(DatabaseUserCredentials.pk_user_uuid).filter(DatabaseUserCredentials.username == username).first()
    return data

async def does_email_exist(db: Session, data):
    email = data.email
    data = db.query(DatabaseUserCredentials.email).filter(DatabaseUserCredentials.email.ilike(email)).first()
    return data

async def get_user_uuid(db: Session, uuid):
    data = db.query(DatabaseUserCredentials).filter(DatabaseUserCredentials.pk_user_uuid == (uuid)).first()
    return data

async def db_update_login_time(db: Session, user_data):
    utc_datetime = datetime.now().astimezone(pytz.utc)
    db.query(DatabaseUserCredentials).filter(DatabaseUserCredentials.pk_user_uuid == user_data.pk_user_uuid).update({"user_last_login_utc": utc_datetime})
    db.commit()
    return

async def search_for_user(db: Session, user_data):
    utc_datetime = datetime.now().astimezone(pytz.utc)
    db.query(DatabaseUserCredentials).filter(DatabaseUserCredentials.pk_user_uuid == user_data.pk_user_uuid).update({"user_last_login_utc": utc_datetime})
    db.commit()
    return