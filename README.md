# FastAPI, Vite, and PostgreSQL Stack

This application is my personal project using Python (FastAPI) and Javascript (React).

FastAPI runs on 0.0.0.0:8000 (Linux) or 127.0.0.1:8000 (Windows).
React is built using Vite and runs on 0.0.0.0:5173.

Requirements:
  
  * Built on 3.9.2 (Stable) higher versions of Python should work but are not tested.
  * A Python Enviroment will need to be created with the "backend/requirements.txt" installing all dependencies.
  * Run "yarn install" to install React-Vite dependencies.
  * FastAPI depends on PostgreSQL service hosted on localhost:5432. It's possible to use other SQL databases, but "backend/utility/db_conn_builder.py" will need to be configured as such.
  * .env file needs to be created in "backend/", this file needs to contain 3 enviroment variables.
    * 2 Secret Keys, both are Base 16.
      * AES_PASS_SECRET is the secret token used to encrypt passwords.
      * TOKEN_SECRET is the secret token used to encrypt persistent tokens for logged in authentication.
      * DB_URL is the URL used to connect to the database. (Postgresql)

Alembic:
  * I recommend using Alembic for database management in this project. The Schema Design currently supports Auto Generation.
  * Please see Alembic documentation if you wish to set it up.