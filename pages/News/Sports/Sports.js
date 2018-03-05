var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'category=sports&'+
          'sortBy=popularity&'+
          'apiKey=3118630c926141359a1760135679e961';
var req = new Request(url);

var config = {
    apiKey: "AIzaSyDcU1bmBhiq1COObVoSMMQSKZKOS7EcAEw",
    authDomain: "realnews-7759b.firebaseapp.com",
    databaseURL: "https://realnews-7759b.firebaseio.com",
    storageBucket: "realnews-7759b.appspot.com"
  };
  firebase.initializeApp(config);

var BiasRatings = JSON.parse(bias);
var SentiRatings = JSON.parse(sentiment);

