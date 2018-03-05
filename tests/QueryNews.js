var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=3118630c926141359a1760135679e961';
var req = new Request(url);
var responseData, x;
fetch(req)
    .then(function(response) {
        responseData = response.json();
        console.log(response);
        console.log(responseData);
        y = response
        x = responseData;
        document.getElementById("output2").innerHTML = y;
        document.getElementById("output").innerHTML = x;
    })
