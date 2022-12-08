import uuid
import pytz
from sqlalchemy import (Column, Integer, String, DateTime)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()
metadata = Base.metadata

class DatabaseUserCredentials(Base):

    __tablename__ = "api_user_info"

    pk_user_uuid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    username_suffix = Column(Integer, nullable=False)
    password = Column(String, nullable=False)
    user_created_on_utc = Column(DateTime, default=datetime.now().astimezone(pytz.utc))
    user_last_login_utc = Column(DateTime, default=datetime.now().astimezone(pytz.utc))

class DatabaseOSRSItems(Base):

    __tablename__ = 'api_osrs_items'

    icon = Column(String(255), nullable=False)
    icon_large = Column(String(255), nullable=False)
    id = Column(Integer, primary_key=True, unique=True, nullable=False)
    type = Column(String(255), nullable=False)
    typeIcon = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    members = Column(String(255), unique=False, nullable=False)