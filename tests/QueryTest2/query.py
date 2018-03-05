import requests
import json
url = ('https://newsapi.org/v2/top-headlines?'
       'country=us&'
       'apiKey=3118630c926141359a1760135679e961')
response = requests.get(url)
data = response.json()
with open('data.txt', 'w') as outfile:
    json.dump(data, outfile)
