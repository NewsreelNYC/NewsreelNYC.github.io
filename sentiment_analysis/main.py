import tweepy
from textblob import TextBlob
import pyrebase
from time import sleep

def run(query):
    consumer_key = 'W9PWjrSnWKxX3KODqgKP0PUDf'
    consumer_secret = 'Sofl0qXLaO6YeRu4ypC5rPWmV1BKqWfayAXeziQ20GRMIJBnsi'

    access_token = 	'872887650759434241-sfXFeQGV9QWBmgitgViQBX1EUv4Iy1S'
    access_token_secret = 'LMl5Uc7oyK3LxhfDT9brEYGaAD3Pq85zlaA6GCvWBGwoc'

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)

    public_tweets = api.search(query)

    counter = 0.0
    avg = 0.0
    total = 0.0

    for tweet in public_tweets:
        analysis = TextBlob(tweet.text)
        total += analysis.sentiment.polarity
        counter += 1

    avg = total/counter
    if(avg>0):
        print(query+":")
        #print(avg)
        print "positive"
        print ""
        if "." not in query:
            postToFirebase(query,"positive")
    else:
        print(query+":")
        #print(avg)
        print "negative"
        print ""
        if "." not in query:
            postToFirebase(query, "negative")

def postToFirebase(network, sentiment):
    config = {
      "apiKey": "AIzaSyDcU1bmBhiq1COObVoSMMQSKZKOS7EcAEw",
      "authDomain": "realnews-7759b.firebaseapp.com",
      "databaseURL": "https://realnews-7759b.firebaseio.com",
      "storageBucket": "realnews-7759b.appspot.com",
      "serviceAccount": "../res/jsons/Real-News-f3f617a22e45.json"
    }
    firebase = pyrebase.initialize_app(config)

    auth = firebase.auth()
    #authenticate a user
    user = auth.sign_in_with_email_and_password("server@realnews.com", "AuthKey123")

    db = firebase.database()

    myNetwork = {"name": network, "sentiment": sentiment}
    db.child(network).set(myNetwork, user['idToken'])


sources = ["CNN","BBC","The Washington Post","USA Today","LA Times","Latimes.com","Chicagotribune.com","The New York Times","NBC News","Newsweek", "Nypost.com","Ibtimes.com","Washingtontimes.com","Usnews.com","The Verge","forbes","Business Insider","Fox News","CBS","Cbssports.com","Nydailynews.com","Npr.org","Denverpost.com","The Hill","People.com","Nola.com","Reuters", "CBC News","CBS News"]


while True:
    for source in sources:
        run(source)
    print("done with a round")
    sleep(300)

