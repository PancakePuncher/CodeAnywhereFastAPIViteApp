import bcrypt
import os
from base64 import (b64decode, b64encode)
from Cryptodome.Cipher import AES
from Cryptodome.Random import get_random_bytes
from dotenv import load_dotenv

load_dotenv()

AES_PASS_SECRET = b64decode(os.environ.get("AES_PASS_SECRET"))

async def password_create(password):

    password = password.encode("utf-8")
    salt = bcrypt.gensalt(14)
    hashed_password = bcrypt.hashpw(password, salt)

    def data_encryption(data, key):

        cipher = AES.new(key, AES.MODE_EAX)
        nonce = cipher.nonce
        encrypted_data = cipher.encrypt(data)
        combined_byte_str = nonce + encrypted_data
        final_encrypted = b64encode(combined_byte_str).decode("utf-8")

        return final_encrypted

    final_encrypted = data_encryption(hashed_password, AES_PASS_SECRET)

    return final_encrypted

async def password_validator(stored_data, input_data):

    password = input_data.password.get_secret_value().encode("utf-8")
    stored_data_bytes = b64decode(stored_data.password)
        
    def data_decryption(data, key):

        cipher = AES.new(key, AES.MODE_EAX, nonce=data[:16])
        decrypted_data = cipher.decrypt(data[16:])

        return decrypted_data

    decrypted_data = data_decryption(stored_data_bytes, AES_PASS_SECRET)
    valid = bcrypt.checkpw(password, decrypted_data)

    return valid

