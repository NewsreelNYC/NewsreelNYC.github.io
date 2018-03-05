function search(){
  var searchbar = document.getElementById('searchbar');
  var query = searchbar.value;
  console.log(query);
  window.location.href = "/pages/News/Search/Search.html?" + query;
}