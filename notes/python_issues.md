# Python Issues
Issues we had with the sentiment analysis portion of RealNews, written in python
### Getting average sentiment & immutable ints in python
We planned to use a simple `for` loop to get the average of all the `sentiment.polarity` values of the tweets
in order to determine how most people on twitter felt about each source, but since, ints are immutable
in python, we had a hard time using the following piece of code to achieve this goal.
```
counter, avg, total = 0.0

for tweet in public_tweets:
    analysis = TextBlob(tweet.text)
    total = total + analysis.sentiment.polarity
    counter = counter + 1

avg = total/counter
```
We considered building our own `Int()` class where we could have added the ability to make the object mutable, but felt we wouldn't be able to replicate all the functionality of standard python ints effectively. So, we decided on using a simple recursive function in order to calculate the average sentiment, shown below:
```

```
