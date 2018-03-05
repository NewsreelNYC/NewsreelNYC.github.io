
  var fullURL = window.location.href;
  console.log(fullURL);
  var query = fullURL.substring((fullURL.indexOf('?')+1),fullURL.length);
  console.log(query);

  var url = 'https://newsapi.org/v2/top-headlines?' +
          'q=' + query + '&'+
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


fetch(req)
  .then(response => {
    setTimeout(() => null, 0);
      return response.json();
  })
  .then(response => {
    console.log(response);
    var grid = "";
    if(response['articles']['2']==null){
      grid = grid + "<center><div id='articletitle'><h3>Sorry, not results were found for " + query + ", please try another term</h3></div><center>";
    }
    else{
        grid = grid + "<div class='card' id='"+title+"'>";
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

            grid = grid + "<div class='card' id='card-outline'>"
            grid = grid + "<div class='card' id='"+title+"'>";
            grid = grid+"<center><div id='source' class='card-footer text-muted'><div id='title'>" + source + "</div></div></center>";
            grid = grid + "<div class='card-block'>";
            
            if(image!=null)
                grid = grid + "<center><a href='" + url + "'><img width='380' height='300' src='" + image + "'></a></center>";
            else
                grid = grid + "<div id='margin'><a href='" + url + "'><button type='button' class='btn btn-warning' id='readarticle'>Read Story</a></button></div><br />"
            grid = grid + "<br />";
            grid = grid + "<strong><h3 id='articletitle' class='card-title'>" + title + "</h3></strong></a>";
            if(description!=null)
              grid = grid + "<p id='descriptionText' class='card-text'>" + description + "</p>";
            if(BiasRatings[source]==null)
              console.log(source);
            grid = grid + "</div>"; //close card block
            //sample footer - <div id="leaning-right" class="card-footer text-muted">
            var c = "center";
            var ll = "leaning-left";
            var sl = "strongly-left";
            var lr = "leaning-right";
            var sr = "strongly-right";
            grid = grid + "<br />";
            //Add bias footer
            if(BiasRatings[source]=="leaning right"){
              grid = grid+"<b><div id='leaning-right' class='card-footer text-muted'><center><div id='leaning-right'>Leaning Right Bias</div></center></div></b>";
            }
            else if(BiasRatings[source]=="leaning left"){
              grid = grid+"<b><div id='leaning-left' class='card-footer text-muted'><center><div id='leaning-left'>Leaning Left Bias</div></center></div></b>";
            }
            else if(BiasRatings[source]=="neutral"){
              grid = grid+"<b><div id='neutral' class='card-footer text-muted'><div id='neutral'><center>Neutral Bias</div></center></div></b>";
            }
            else if(BiasRatings[source]=="strongly left"){
              grid = grid+"<b><div id='strongly-left' class='card-footer text-muted'><div id='strongly-left'><center>Strongly Left Bias</div></center></div></b>";
            }
            else if(BiasRatings[source]=="strongly right"){
              grid = grid+"<b><div id='strongly-right' class='card-footer text-muted'><center><div id='strongly-right'>Strongly Right Bias</div></center></div></b>";
            }
            else{
              grid = grid+"<b><div id='neutral' class='card-footer text-muted'><center><div id='neutral'>Neutral Bias</div></center></div></b>";
            }

            if(SentiRatings[source]=="positive"){
              grid = grid+"<b><div id='positive' class='card-footer text-muted'><center><div id='positive'>Positive Sentiment</div></center></div></b>";
            }
            else if(SentiRatings[source]=="negative"){
              grid = grid+"<b><div id='negative' class='card-footer text-muted'><center><div id='negative'>Negative Sentiment</div></center></div></b>";
            }
            else{
              grid = grid+"<div id='positive' class='card-footer text-muted'><center><div id='positive'>Postive Sentiment</div></center></div></b>";
            }
            grid = grid + "</div>"; //close card
            grid = grid + "</div>"; //close outline
            grid = grid+"<br />";
            grid = grid+"<center><img src='../../../res/img/Line.jpg' height='1' width='300'></center>";
            grid = grid+"<br />";
            //grid = grid + "</a>"//close link
            grid = grid+"</div>";

            }
          }
          grid = grid+"</div>";
        }
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

function search(){
  var searchbar = document.getElementById('searchbar');
  var query = searchbar.value;
  console.log(query);
  window.location.href = "/pages/News/Search/Search.html?" + query;
}

