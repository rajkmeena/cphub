
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
import nest_asyncio
from pyngrok import ngrok
import uvicorn
import json
import datefinder
app = FastAPI()
origins = ["*"]
def datext(str):
  matches = datefinder.find_dates(str)
  ans=[]
  for match in matches:
      ans.append(match)
  return ans
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
f = open('./crawler/spiders/call_for_proposals.json')
data = json.load(f)
@app.get('/file')
async def home():
  # print(lis)
  return data

@app.post("/123")
async def get_body(request: Request):
    data= await request.json()
    # print(type(data["string"]))
    return datext(data["string"])

ngrok_tunnel = ngrok.connect(8001)
print('Public URL:', ngrok_tunnel.public_url)
nest_asyncio.apply()
uvicorn.run(app, port=8001)