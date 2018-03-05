import pyrebase
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

CNNRate = 'negative'
BBCRate = 'positive'

CNN = {"name": "CNN", "sentiment": CNNRate}
db.child("sources").child("CNN").set(CNN, user['idToken'])
BBC = {"name": "BBC", "sentiment": BBCRate}
db.child("sources").child("BBC").set(BBC, user['idToken'])
