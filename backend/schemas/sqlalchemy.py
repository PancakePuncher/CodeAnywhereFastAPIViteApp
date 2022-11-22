import uuid
import pytz
from sqlalchemy import (Column, Integer, String, DateTime)
from sqlalchemy.dialects.postgresql import UUID
from utility.db_conn_builder import Base
from datetime import datetime


class DatabaseUserCredentials(Base):

    __tablename__ = "api_user_info"

    pk_user_uuid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    username_suffix = Column(Integer, nullable=False)
    password = Column(String, nullable=False)
    user_created_on_utc = Column(DateTime, default=datetime.now().astimezone(pytz.utc))
    user_last_login_utc = Column(DateTime, default=datetime.now().astimezone(pytz.utc))


