
function searchInInput() {

  var searchBtn = $('#btn-film');

  searchBtn.click(function() {
    callApiForFilm();
    callApiForTv();
  });
}

function callApiForFilm() {
  var valueInput = $('#cerca-film').val();


  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      'api_key': '13905809c368b789098db62d2afec412',
      'query': valueInput
    },
    success: function(data, state) {
      var movies = data['results'];

      // console.log(data);
      console.log(movies);

      printFilm(movies);
      $('#cerca-film').val('');


    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);

    }
  });
}

function printFilm(movies) {
  var template = $('#template-film').html();
  var compiled = Handlebars.compile(template);
  var target = $('#target-film-container');

  // target.html('');
  for (var i = 0; i < movies.length; i++) {
    var filmInfoHTML = compiled({
      'titolo': 'Title: ' + movies[i]['title'],
      'titoloOriginale': 'Original title: ' + movies[i]['original_title'],
      'lingua': 'Original language: ' + movies[i]['original_language'],
      'voto': 'Vote: ',  //Math.floor(value[i]['vote_average'] / 2),  //ho fatto in modo che la valutazione vada da 1 a 5 anzichè da 1 a 10
      'valutazione': Math.floor(movies[i]['vote_average'] / 2),
      'nazione': movies[i]['original_language']

    });



    target.append(filmInfoHTML);



  }
  // stelle
  var valutazione0 = $('li[data-vote="0"]');
  var valutazione1 = $('li[data-vote="1"]');
  var valutazione2 = $('li[data-vote="2"]');
  var valutazione3 = $('li[data-vote="3"]');
  var valutazione4 = $('li[data-vote="4"]');
  var valutazione5 = $('li[data-vote="5"]');

  valutazione0.append('Vote not available');
  valutazione1.append('<i class="fas fa-star"></i>');
  valutazione2.append('<i class="fas fa-star"></i> <i class="fas fa-star"></i>');
  valutazione3.append('<i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>')
  valutazione4.append('<i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>');
  valutazione5.append('<i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>');

  // bandiere
  var flagEn = $('li[data-flag="en"]');
  var flagIt = $('li[data-flag="it"]');
  var flagJa = $('li[data-flag="ja"]');

  flagEn.html('Original language: ' + ' <img class="flag" src="img/eng.jpg" alt="flag">');
  flagJa.html('Original language: ' + ' <img class="flag" src="img/jp.jpg" alt="flag">');
  flagIt.html('Original language: ' + ' <img class="flag" src="img/ita.jpg" alt="flag">');

}

function callApiForTv() {
  var valueInput = $('#cerca-film').val();

  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv',
    method: 'GET',
    data: {
      'api_key': '13905809c368b789098db62d2afec412',
      'query': valueInput
    },
    success: function(data, state) {
      var tvSeries = data['results'];

      // console.log(data);
      console.log(tvSeries);

      printTvSeries(tvSeries);
      $('#cerca-film').val('');


    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);

    }
  });

}




function printTvSeries(tvSeries) {
  var templateTv = $('#template-Tv').html();
  var compiled = Handlebars.compile(templateTv);
  var targetTv = $('#target-film-container');

  targetTv.html('');
  for (var i = 0; i < tvSeries.length; i++) {
    var tvHTML = compiled({
      'titolo': 'Title: ' + tvSeries[i]['name'],
      'titoloOriginale': 'Original title: ' + tvSeries[i]['original_name'],
      'lingua': 'Original language: ' + tvSeries[i]['original_language'],
      'voto': 'Vote: ', //Math.floor(tvSeries[i]['vote_average'] / 2),
      'valutazione': Math.floor(tvSeries[i]['vote_average'] / 2),
      'nazione': tvSeries[i]['original_language']

    });



    targetTv.append(tvHTML);



  }
  // stelle
  var valutazione0 = $('li[data-vote="0"]');
  var valutazione1 = $('li[data-vote="1"]');
  var valutazione2 = $('li[data-vote="2"]');
  var valutazione3 = $('li[data-vote="3"]');
  var valutazione4 = $('li[data-vote="4"]');
  var valutazione5 = $('li[data-vote="5"]');

  valutazione0.append('Vote not available');
  valutazione1.append('<i class="fas fa-star"></i>');
  valutazione2.append('<i class="fas fa-star"></i> <i class="fas fa-star"></i>');
  valutazione3.append('<i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>')
  valutazione4.append('<i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>');
  valutazione5.append('<i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>');

  // bandiere
  var flagEn = $('li[data-flag="en"]');
  var flagIt = $('li[data-flag="it"]');
  var flagJa = $('li[data-flag="ja"]');

  flagEn.html('Original language: ' + ' <img class="flag" src="img/eng.jpg" alt="flag">');
  flagJa.html('Original language: ' + ' <img class="flag" src="img/jp.jpg" alt="flag">');
  flagIt.html('Original language: ' + ' <img class="flag" src="img/ita.jpg" alt="flag">');

}














$(document).ready(function() {
  searchInInput()
});
