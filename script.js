
function searchInInput() {

  var searchBtn = $('#btn-film');

  searchBtn.click(callApiForFilm);
}

function callApiForFilm() {
  var valueInputFilm = $('#cerca-film').val();


  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      'api_key': '13905809c368b789098db62d2afec412',
      'query': valueInputFilm
    },
    success: function(data, state) {
      var value = data['results'];

      // console.log(data);
      console.log(value);
      // console.log(value[0]['title']);

      printFilm(value);



    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);

    }
  });
}

function printFilm(value) {
  var template = $('#template-film').html();
  var compiled = Handlebars.compile(template);
  var target = $('#target-film-container');

  target.html('');
  for (var i = 0; i < value.length; i++) {
    var filmInfoHTML = compiled({
      'titolo': 'Title: ' + value[i]['title'],
      'titoloOriginale': 'Original title: ' + value[i]['original_title'],
      'lingua': 'Original language: ' + value[i]['original_language'],
      'voto': 'Vote: ' + value[i]['vote_average']
    });

    target.append(filmInfoHTML);
  }
}














$(document).ready(function() {
  searchInInput()
});
