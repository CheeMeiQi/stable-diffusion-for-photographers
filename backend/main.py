from fastapi import FastAPI
from fastapi.responses import StreamingResponse, Response
import fastapi as _fapi
from fastapi.middleware.cors import CORSMiddleware

import imagePrompt as _imagePrompt
import api as _api
from io import BytesIO
# import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add the origin of your React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get("/")
# def read_root():
#     return {"message": "Welcome to Stable Diffusion for Photographers"}

@app.get("/api/generate/")
async def generate_image(imgPromptCreate: _imagePrompt.ImageCreate = _fapi.Depends()):
    
    image = await _api.generate_image(imgPrompt=imgPromptCreate)

    image.save("./images/testimage.png")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)
    #imgstr = base64.b64encode(buffer.getvalue())
    
    return StreamingResponse(buffer, media_type="image/png")

# Endpoint to test the Front-end and backend
@app.get("/api/training")
async def train_model():
    return {"message": "Welcome to the training of Stable Diffusion models"}
