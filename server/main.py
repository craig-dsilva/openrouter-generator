import requests
import base64
import os
from dotenv import load_dotenv
from fastapi import FastAPI

app = FastAPI()

load_dotenv()

API_KEY_REF = os.getenv("API_KEY_REF")

@app.get("/image", status_code=200)
async def image():
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY_REF}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "sourceful/riverflow-v2-fast",
        "messages": [
            {
                "role": "user",
                "content": "Generate a beautiful sunset over mountains"
            }
        ],
        "modalities": ["image"]
    }

    response = requests.post(url, headers=headers, json=payload)
    result = response.json()


    if result.get("choices"):
        message = result["choices"][0]["message"]
        if message.get("images"):
            for image in message["images"]:
                image_url = image["image_url"]["url"]
                base64_string = image_url.split(",", 1)[-1] # Strips the URL and returns a base64_string
                with open("./images/output.png", "wb") as f:
                    f.write(base64.b64decode(base64_string)) # Creates a file from base64 string

    # Send the response from OpenRouter to the client
    return result
