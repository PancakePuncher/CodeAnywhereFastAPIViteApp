import json
from fastapi import (APIRouter, 
                    HTTPException, 
                    Header,
                    Depends, 
                    status, 
                    Response,
                    Form)
from fastapi.responses import JSONResponse
from fastapi.security import (OAuth2PasswordBearer, 
                            OAuth2PasswordRequestForm)
from schemas.pydantic import (UserLoginIn, 
                            UserCreateIn, 
                            UserSearchIn, 
                            UserLoginResponse)
from utility.user_info_handling import (password_create, 
                                        password_validator)
from utility.token_handling import (token_creator, 
                                verify_token)
from utility.database_util import (create_new_user, 
                                get_user_from_db, db_update_login_time)
from sqlalchemy.orm import (Session)
from utility.db_conn_builder import (get_db)
from utility.misc_functionality import (get_user_details)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="./user/login")

router = APIRouter(
    prefix="/user",
    tags=["User Routes"]
)

@router.post("/login")
async def login_user(response: Response, data: UserLoginIn = Depends(UserLoginIn.as_form), db: Session = Depends(get_db)):
    stored_data = await get_user_from_db(db, data)
    
    if stored_data == None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return response
        
    valid = await password_validator(stored_data, data)

    if valid == True:
        await db_update_login_time(db, stored_data)
        token = await token_creator(stored_data)
        response.status_code = status.HTTP_202_ACCEPTED
        response.set_cookie(key="token", 
                            value=token, 
                            samesite="None",
                            httponly=True,
                            secure=True,
                            expires=604800,
                            )
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
    return response

@router.get("/logout")
async def logout_user(response: Response):
    response.status_code = status.HTTP_200_OK
    response.delete_cookie("token")
    return response

@router.post("/create", description="This route is used to create a new user.")
async def create_user(data: UserCreateIn = Depends(UserCreateIn.as_form), db: Session = Depends(get_db)):
    if data.username == "string" or data.password == "string" or data.email == "user@example.com":
        response.status_code = status.HTTP_400_BAD_REQUEST

    data.password = await password_create(data.password.get_secret_value())
    user_created = await create_new_user(db, data)
    if user_created == "Created.":
        response.status_code = status.HTTP_201_CREATED
    elif user_created == "Aready Exist.":
        response.status_code = status.HTTP_400_BAD_REQUEST
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
    return response

@router.post("/user_search", description="This route is used to search for a user. At this time this route is only used to validate OAuth2 is functioning.")
async def search_for_user(Username: str = "", Email: str = "", Suffix: int = 0, SearchType: bool = True, db: Session = Depends(get_db),  token: str = Depends(oauth2_scheme)):
    token_auth_check, token_info = await verify_token(token)
    if token_auth_check == True:
        
        return status.HTTP_202_ACCEPTED
    elif token_auth_check == False:
        return status.HTTP_401_UNAUTHORIZED

@router.get("/auth")
async def auth(response: Response, cookie: str = Header("cookie"), db: Session = Depends(get_db)):
    token = cookie[6:]
    token_auth_check, token_info = await verify_token(token)
    if token_auth_check == True:
        data = await get_user_details(token_info["token_owner"], db)
        return JSONResponse(content=data, status_code=status.HTTP_202_ACCEPTED)
    elif token_auth_check == False:
        response.status_code = status.HTTP_401_UNAUTHORIZED
    
    return response