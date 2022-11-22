import json
from schemas.pydantic import (DbUserPublic)
from utility.database_util import (get_user_uuid)

async def get_user_details(uuid, db):
    db_data = await get_user_uuid(db, uuid)
    UserDataPublic = json.loads(DbUserPublic(
        username=db_data.username,
        email=db_data.email,
        username_suffix=db_data.username_suffix,
        user_created_on_utc=str(db_data.user_created_on_utc),
        user_last_login_utc=str(db_data.user_last_login_utc)
    ).json())

    return UserDataPublic