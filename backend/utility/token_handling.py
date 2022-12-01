import os
import json
import pytz
from datetime import datetime
from dateutil import parser
from base64 import (b64decode, b64encode)
from Cryptodome.Cipher import ChaCha20_Poly1305
from dotenv import load_dotenv

load_dotenv()

TOKEN_SECRET = b64decode(os.environ.get('TOKEN_SECRET').encode("utf-8"))

async def token_creator(data):

    payload = {
        "token_owner": str(data.pk_user_uuid),
        "token_created_on": str(datetime.now().astimezone(pytz.utc)),
    }

    payload_jsonify = json.dumps(payload)
    payload_bytes = payload_jsonify.encode("utf-8")

    cipher = ChaCha20_Poly1305.new(key=TOKEN_SECRET)
    nonce = cipher.nonce
    cipherpayload, tag = cipher.encrypt_and_digest(payload_bytes)
    token = nonce + cipherpayload + tag
    
    token = b64encode(token).decode("utf-8")

    return token

async def verify_token(token):

    payload_to_dict = ""

    token_validity = False

    async def check_if_token_expired(created_timestamp):
        date_converted = parser.parse(created_timestamp)
        current_time = datetime.now().astimezone(pytz.utc)

        diff = current_time - date_converted
        seconds = int(diff.total_seconds())
        days, remainder_seconds = divmod(seconds, 86400)

        if days >= 7:
            return False
        elif days < 7:
            return True
        else:
            return False

    try:
        token_bytes = b64decode(token)
        cipher = ChaCha20_Poly1305.new(key=TOKEN_SECRET, nonce=token_bytes[:12])
        payload_decrypted = cipher.decrypt_and_verify(token_bytes[12:-16], token_bytes[-16:])
        payload_to_str = payload_decrypted.decode("utf-8")
        payload_to_dict = json.loads(payload_to_str)
        token_validity = await check_if_token_expired(payload_to_dict["token_created_on"])
    except Exception:
        token_validity = False
    
    return token_validity, payload_to_dict