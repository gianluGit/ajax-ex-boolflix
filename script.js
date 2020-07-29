
function searchInInput() {

  var searchBtn = $('#btn-film');

  searchBtn.click(function() {
    var valueInput = $('#cerca-film').val();
    var target = $('#target-film-container');
    target.text('');


    callApiForFilm(valueInput);
    callApiForTv(valueInput);

    $('#cerca-film').val('');

  });
}



function callApiForFilm(valueInput) {



  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      'api_key': '13905809c368b789098db62d2afec412',
      'query': valueInput
    },
    success: function(data, state) {
      var movies = data['results'];

      console.log(movies);

      printFilm(movies);


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

  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var vote = Math.ceil(movie['vote_average'] / 2);

    var poster = movie['poster_path'];
    movie['cover'] = '<img class="cover-img" alt="image not found" src="https://image.tmdb.org/t/p/w342' + poster + '">'

    movie['stars'] = ratings(vote);

    var lang = movie['original_language'];
    movie['flag'] = flags(lang);

    var filmInfoHTML = compiled(movie);
    target.append(filmInfoHTML);



  }
}

function callApiForTv(valueInput) {

  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv',
    method: 'GET',
    data: {
      'api_key': '13905809c368b789098db62d2afec412',
      'query': valueInput
    },
    success: function(data, state) {
      var tvSeries = data['results'];

      console.log(tvSeries);

      printTvSeries(tvSeries);


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

  for (var i = 0; i < tvSeries.length; i++) {
    var serie = tvSeries[i];

    var poster = serie['poster_path'];
    serie['cover'] = '<img class="cover-img" alt="image not found" src="https://image.tmdb.org/t/p/w342' + poster + '">'


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
