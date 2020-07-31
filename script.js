
function searchInInput() {

  var searchBtn = $('#btn-film');
  searchBtn.click(clickBtn);


  // attivazione del btn anche alla pressione di invio
  $(document).keydown(function() {
    if (event.which == 13) {
      clickBtn();
    }
  });


  function clickBtn() {
    var valueInput = $('#cerca-film').val();
    var target = $('#target-film-container');
    target.text('');


    callApiForFilm(valueInput);
    callApiForTv(valueInput);

    $('#cerca-film').val('');

  }
}

function refreshPage() {
  var titlePage = $('#title-page');

  titlePage.click(function() {
    location.reload();
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
    movie['poster'] = printPoster(poster);

    movie['stars'] = ratings(vote);

    var lang = movie['original_language'];
    movie['flag'] = flags(lang);

    var overview = movie['overview'];
    movie['text_overview'] = printOverview(overview);
    if (overview.length > 250) {
      movie['text_overview'] = overview.substring(0, 250) + '...';
    }


    if (movie['title'] == movie['original_title']) {
      $('li.original-title').hide();
    }


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
    serie['poster'] = printPoster(poster);

    var vote = Math.ceil(serie['vote_average'] / 2);
    serie['stars'] = ratings(vote);

    var lang = serie['original_language'];
    serie['flag'] = flags(lang);

    var overview = serie['overview'];
    serie['text_overview'] = printOverview(overview);

    if (overview.length > 250) {
      serie['text_overview'] = overview.substring(0, 250) + '...';
    }

    if (serie['name'] == serie['original_name']) {
      $('li.original-title').hide();
    }


    var tvHTML = compiled(serie)
    target.append(tvHTML);



  }

}




function ratings(vote) {
  var starsHTML = '';

  for (var k = 0; k < 5; k++) {
    if (k < vote) {
      starsHTML += '<i class="fas fa-star gold"></i>'
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

function printPoster(poster) {
  if (poster) {
    // return '<img class="cover-img" src="https://image.tmdb.org/t/p/w342' + poster + '">';
    return `<img class="cover-img" src="https://image.tmdb.org/t/p/w342${poster}">`;
  }

  return '<img class="cover-img" src="img/not-found.jpg">';

}

function printOverview(overview) {
  if (overview) {
    return overview;
  }
  return 'Nothing to say';
}




$(document).ready(function() {
  searchInInput();
  refreshPage();
});
