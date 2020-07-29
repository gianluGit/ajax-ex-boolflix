
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

  target.html('');
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var vote = Math.ceil(movie['vote_average'] / 2);

    movie['stars'] = ratings(vote);

    var lang = movie['original_language'];
    movie['flag'] = flags(lang);

    var filmInfoHTML = compiled(movie);
    target.append(filmInfoHTML);



  }
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
      // $('#cerca-film').val('');


    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);

    }
  });

}




function printTvSeries(tvSeries) {
  var template = $('#template-Tv').html();
  var compiled = Handlebars.compile(template);
  var target = $('#target-film-container');

  // target.html('');
  for (var i = 0; i < tvSeries.length; i++) {
    var serie = tvSeries[i];

    var vote = Math.ceil(serie['vote_average'] / 2);
    serie['stars'] = ratings(vote);

    var lang = serie['original_language'];
    serie['flag'] = flags(lang);

    var tvHTML = compiled(serie)
    target.append(tvHTML);



  }

}




function ratings(vote) {
  var starsHTML = '';

  for (var k = 0; k < 5; k++) {
    if (k < vote) {
      starsHTML += '<i class="fas fa-star"></i>'
    } else {
      starsHTML += '<i class="far fa-star"></i>'
    }
  }
  return starsHTML;

}

function flags(lang) {
  if (lang == 'en' || lang == 'it' || lang == 'ja') {
    return `<img class='flag' src="img/${lang}.jpg">`;
  }

  return lang

}




$(document).ready(function() {
  searchInInput();

});
