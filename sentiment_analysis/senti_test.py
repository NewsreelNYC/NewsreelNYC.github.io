from textblob import TextBlob
wiki = TextBlob("Pratham is angry that he never gets good matches on Tiner")
print (wiki.tags)
print (wiki.words)
print (wiki.sentiment.polarity)
