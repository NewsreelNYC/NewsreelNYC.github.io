
  var fullURL = window.location.href;
  console.log(fullURL);
  var query = fullURL.substring((fullURL.indexOf('?')+1),fullURL.length);
  console.log(query);

  var url = 'https://newsapi.org/v2/top-headlines?' +
          'q=' + 'microsoft' + '&'+
          'sortBy=popularity&'+
          'apiKey=3118630c926141359a1760135679e961';

  console.log(url);
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


fetch(req)
  .then(response => {
    setTimeout(() => null, 0);
      return response.json();
  })
  .then(response => {
    console.log(response);
    var grid = "";

    for(i=0;i<7;i++){
      grid = grid + "<div class='row'>";
      for(j=0;j<3;j++){
        index=(i*3)+(j+1);
        if((response['articles'][index.toString()])==undefined){
          continue;
        }
        else{
        grid = grid + "<div class='col-sm-4'>";

        //different article props
        var url = response['articles'][index.toString()]['url'];
        var title = response['articles'][index.toString()]['title'];
        var author = response['articles'][index.toString()]['author'];
        var description = response['articles'][index.toString()]['description'];
        var source = response['articles'][index.toString()]['source']['name'];
        var image = response['articles'][index.toString()]['urlToImage'];


        grid = grid + "<div class='card' id='"+title+"'>";
        grid = grid+"<div id='source' class='card-footer text-muted'><div id='title'>" + source + "</div></div>";
        grid = grid + "<div class='card-block'>";
        grid = grid + "<h3 class='card-title'>" + title + "</h3>";
        if(image!=null)
            grid = grid + "<img width='450' height='300' src='" + image + "'>";
        if(description!=null)
          grid = grid + "<p class='card-text'>" + description + "</p>";
        if(url!=null)
          grid = grid + "<button type='button' class='btn btn-warning'><a href='" + url + "'>Read Story</a></button><br />"
        if(BiasRatings[source]==null)
          console.log(source);
        grid = grid + "</div>"; //close card block
        //sample footer - <div id="leaning-right" class="card-footer text-muted">
        var c = "center";
        var ll = "leaning-left";
        var sl = "strongly-left";
        var lr = "leaning-right";
        var sr = "strongly-right";
        //Add bias footer
        if(BiasRatings[source]=="leaning right"){
          grid = grid+"<div id='leaning-right' class='card-footer text-muted'>Leaning Right</div>";
        }
        else if(BiasRatings[source]=="leaning left"){
          grid = grid+"<div id='leaning-left' class='card-footer text-muted'>Leaning Left</div>";
        }
        else if(BiasRatings[source]=="neutral"){
          grid = grid+"<div id='neutral' class='card-footer text-muted'>Neutral</div>";
        }
        else if(BiasRatings[source]=="strongly left"){
          grid = grid+"<div id='strongly-left' class='card-footer text-muted'>Strongly Left</div>";
        }
        else if(BiasRatings[source]=="strongly right"){
          grid = grid+"<div id='strongly-right' class='card-footer text-muted'>Strongly Right</div>";
        }
        else{
          grid = grid+"<div id='neutral' class='card-footer text-muted'>Neutral</div>";
        }
        grid = grid + "</div>"; //close card
        grid = grid+"<br />";
        //grid = grid + "</a>"//close link
        grid = grid+"</div>";
        }
      }
      grid = grid+"</div>";
    }
    
    /**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content;
  }

    //console.log(grid);

    var end = grid;
    var endHTML = htmlToElement(end)
    console.log(endHTML);
    var news = document.getElementById("news");
    news.appendChild(endHTML);




  });



