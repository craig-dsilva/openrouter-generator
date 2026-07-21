import requests
import base64
import datetime
from fastapi import FastAPI, Header, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from typing import Annotated
from pathlib import Path

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_user_api_key(x_user_api_key: str = Header(...)):
    if not x_user_api_key:
        raise HTTPException(status_code=401, detail="API key required")
    return x_user_api_key

# Mounts image directory as route
app.mount("/images", StaticFiles(directory="images"), name="images")

NonEmptyStr = Annotated[str, Field(min_length=1)]

class Prompt(BaseModel):
    model: NonEmptyStr
    message: NonEmptyStr
    

@app.post("/image", status_code=200)
async def image(prompt: Prompt, API_KEY_REF: str = Depends(get_user_api_key)):
    file_name = f"./images/{datetime.datetime.now()}.png"
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY_REF}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": prompt.model,
        "messages": [
            {
                "role": "user",
                "content": prompt.message
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
                Path(file_name).parent.mkdir(parents=True, exist_ok=True)
                with open(file_name, "wb") as f:
                    f.write(base64.b64decode(base64_string)) # Creates a file from base64 string

    # Send the response from OpenRouter to the client
    return {"result": result, "file_name": file_name}
