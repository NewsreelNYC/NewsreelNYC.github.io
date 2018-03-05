var config = {
    apiKey: "AIzaSyDcU1bmBhiq1COObVoSMMQSKZKOS7EcAEw",
    authDomain: "realnews-7759b.firebaseapp.com",
    databaseURL: "https://realnews-7759b.firebaseio.com",
    storageBucket: "realnews-7759b.appspot.com"
  };
 
 firebase.initializeApp(config);

var database = firebase.database();

var BiasRatings = JSON.parse(bias);
var SentiRatings = JSON.parse(sentiment);

function agree(source, divId){
	writeData(source,"yes");
	voted(divId);
}

function disagree(source, divId){
	writeData(source,"no");
	voted(divId);
}

function writeData(source, agreeStatus) {
	if(agreeStatus=="yes"){
		firebase.database().ref('source/').set({
	    name: source,
	    agree: "yes",
	  });
	}
	else{
	  firebase.database().ref('source/').set({
	    name: source,
	    agree: "no",
	  });
	}
}

function voted(divId){
	var section = document.getElementById(divId);
	console.log(divId);
	console.log(section);
	section.innerHTML = "Thanks for voting!"
}