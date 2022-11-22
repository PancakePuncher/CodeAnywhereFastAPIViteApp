import inspect
from fastapi import Form
from pydantic import (BaseModel, Field, EmailStr, SecretStr)
from datetime import datetime
from uuid import UUID
from typing import Dict, Type

def as_form(cls: Type[BaseModel]):
    """
    Adds an as_form class method to decorated models. The as_form class method
    can be used with FastAPI endpoints
    """
    new_params = [
        inspect.Parameter(
            field.alias,
            inspect.Parameter.POSITIONAL_ONLY,
            default=(Form(field.default) if not field.required else Form(...)),
            annotation=field.outer_type_,
        )
        for field in cls.__fields__.values()
    ]

    async def _as_form(**data):
        return cls(**data)

    sig = inspect.signature(_as_form)
    sig = sig.replace(parameters=new_params)
    _as_form.__signature__ = sig
    setattr(cls, "as_form", _as_form)
    return cls

@as_form
class UserLoginIn(BaseModel):
    email: EmailStr = Field(...)
    password: SecretStr = Field(...)

@as_form
class UserCreateIn(BaseModel):
    username: str = Field(...)
    password: SecretStr = Field(...)
    email: EmailStr = Field(...)

class UserSearchIn(BaseModel):
    email: EmailStr = Field(...)

class UserLoginResponse(BaseModel):
    access_token: str = Field(default="")
    token_type: str = Field(default="Bearer")

class DbUserPublic(BaseModel):
    username: str
    email: str
    username_suffix: int
    user_created_on_utc: datetime
    user_last_login_utc: datetime

    class Config:
        orm_mode=True
