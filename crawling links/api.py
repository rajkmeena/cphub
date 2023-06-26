import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

def get_events():
    r = requests.get('http://google.com/search?q=calls%20for%20proposals')
    soup = BeautifulSoup(r.content, 'html.parser')
    s = soup.find_all('a')
    data_list = []
    url = {}
    cnt = 1
    for i in s:
        if i.get("href")[7] != 'h':
            continue
        if i.get("href").find('google.com') != -1:
            continue

        ur = i.get("href").split('&')[0]
        url[cnt] = ur[7:]
        cnt += 1
    return url

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/index')
async def home():
    event_list = get_events()
    return event_list

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
