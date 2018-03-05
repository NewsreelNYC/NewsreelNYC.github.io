import tweepy
from textblob import TextBlob

class Sent(object):


    consumer_key = ''
    consumer_secret = ''

    access_token = ''
    access_token_secret = ''

    auth = None

    api = None


    searchTerm = ''
    def __init__(self, query):
        self.searchTerm=query

        self.consumer_key = 'F7j5a1M1xuGl9dSN5YpYtE8ar'
        self.consumer_secret = 'QTMIYonMae1jWu46IQRBa1dJoK2VUAyRfXzUEVEbwiMe0BDW8h'

        self.access_token = 	'872887650759434241-vWNHNbfyCeGt5G1MtayjCOxTUdFeXJF'
        self.access_token_secret = 'Gsb1mxnpyGsSEWJ74NxeWsSRqmCxTthR1tl4b1Y7WDZcq'

        self.auth = tweepy.OAuthHandler(self.consumer_key, self.consumer_secret)
        self.auth.set_access_token(self.access_token, self.access_token_secret)

        self.api = tweepy.API(self.auth)

    def getSenti(test):
        public_tweets = api.search('')

        counter = 0.0
        avg = 0.0
        total = 0.0

        for tweet in public_tweets:
            analysis = TextBlob(tweet.text)
            total += analysis.sentiment.polarity
            counter += 1

        avg = total/counter
        if(avg>-0.2 and avg<0.2):
            return "neutral"
        elif(avg<-0.2):
            return "negative"
        else:
            return "positive"
