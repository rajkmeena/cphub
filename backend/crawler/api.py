from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json
import datefinder

app = FastAPI()
origins = ["*"]

def datext(input_str):
    matches = datefinder.find_dates(input_str)
    return list(matches)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open('./crawler/spiders/call_for_proposals.json') as f:
    data = json.load(f)

@app.get('/file')
async def home():
    return data

@app.post("/123")
async def get_body(request: Request):
    data = await request.json()
    return datext(data["string"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
