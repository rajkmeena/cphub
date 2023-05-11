import requests
from bs4 import BeautifulSoup
import re

def getevents():
    r = requests.get('http://google.com/search?q=calls%20for%20proposals')
    soup = BeautifulSoup(r.content, 'html.parser')
  # print(soup)
    s = soup.find_all('a')
  # url=s.find_all('a')
  # print(url)
    data_list = []
    url={}
    cnt=1
    for i in s:
      if i.get("href")[7]!='h':
        continue
      if i.get("href").find('google.com')!=-1:
        continue

      ur=i.get("href").split('&')[0]
      url[cnt]=ur[7:]
      cnt+=1
    # print(url)  
    return url  

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import nest_asyncio
from pyngrok import ngrok
import uvicorn

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/index')
async def home():
  lis=getevents()
  # print(lis)
  return lis

ngrok_tunnel = ngrok.connect(8000)
print('Public URL:', ngrok_tunnel.public_url)
nest_asyncio.apply()
uvicorn.run(app, port=8000)