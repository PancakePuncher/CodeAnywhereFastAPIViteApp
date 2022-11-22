import platform
import uvicorn
import os
import sys
from routes import (users, home)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

SQLALCHEMY_DATABASE_URL = os.environ.get('DB_URL')

origins = [
    "http://localhost:5173",
    "http://127.0.0.2:5173",
    "https://port-5173-reactfastapiapp-pancakepuncher802511.codeanyapp.com",
    "https://port-5173-reactfastapiapp-pancakepuncher802511.preview.codeanywhere.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "HEAD", "OPTIONS"],
    allow_headers=["Content-Type","Set-Cookie"],
)


app.include_router(users.router)
app.include_router(home.router)


if __name__ == "__main__":

    if platform.system() == "Windows":
        ip = "127.0.0.1"
    elif platform.system() == "Linux":
        ip = "0.0.0.0"
        
    sys.dont_write_bytecode = True
    uvicorn.run("main:app",
            host=ip,
            port=8000,
            reload=True,
            )