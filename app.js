// Logo animation

const logo = document.querySelectorAll("#logo path");

logo.forEach((letter) => {
  letter.style.strokeDasharray = letter.getTotalLength();
  letter.style.strokeDashoffset = letter.getTotalLength();
});

// Getting the Now playing movies

const loadMovies = () => {
  loadNowPlaying();
  loadPopular();
  loadTopRated();
  loadUpcomming();
};

window.addEventListener("load", loadMovies);

const getNowPlaying = async () => {
  const nowPlayingUrl =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=ec002527d6c6ee4ad05b7a57a673a4c6";

  const nowPlaynigResponse = await fetch(nowPlayingUrl);

  if (nowPlaynigResponse.status !== 200) {
    throw new Error("Failed to get now playing movies");
  }

  const nowPlaynigMovies = nowPlaynigResponse.json();

  return nowPlaynigMovies;
};

const loadNowPlaying = () => {
  getNowPlaying()
    .then((movies) => {
      const bannerContainer = document.querySelector(".banner-container"),
        randomMovieTitle = document.querySelector(".movie-title"),
        randomMovieDiscription = document.querySelector(".movie-discription"),
        randomMovie =
          movies.results[Math.floor(Math.random() * movies.results.length)];

      bannerContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${randomMovie.backdrop_path})`;

      randomMovieTitle.textContent = randomMovie.title;

      randomMovieDiscription.textContent = randomMovie.overview;

      const nowPlayingMoviesContainer = document.querySelector("#nowplaying");

      for (const movie of movies.results) {
        const movieContainer = document.createElement("div"),
          moviePoster = document.createElement("img"),
          movieTitle = document.createElement("h3"),
          movieRating = document.createElement("P");

        movieContainer.setAttribute("id", movie.id);
        movieContainer.setAttribute("class", "movie");
        moviePoster.setAttribute("class", "movie-poster");
        moviePoster.setAttribute(
          "src",
          "https://image.tmdb.org/t/p/w500" + movie.poster_path
        );
        movieTitle.setAttribute("class", "title");
        movieRating.setAttribute("class", "rating");

        if (movie.original_title.length > 17) {
          movieTitle.textContent = movie.original_title.slice(0, 17) + "...";

          movieTitle.setAttribute("title", movie.original_title);
        } else {
          movieTitle.textContent = movie.original_title;
        }

        movieRating.textContent = movie.vote_average + "/10";

        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(movieRating);

        nowPlayingMoviesContainer.appendChild(movieContainer);
      }
    })
    .catch((error) => {
      console.log("Rejected:", error.message);
    });
};

const getPopular = async () => {
  const popularUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=ec002527d6c6ee4ad05b7a57a673a4c6";

  const popularResponse = await fetch(popularUrl);

  if (popularResponse.status !== 200) {
    throw new Error("Failed to get popular movies");
  }

  const popularMovies = popularResponse.json();

  return popularMovies;
};

const loadPopular = () => {
  getPopular()
    .then((movies) => {
      const popularMoviesContainer = document.querySelector("#popular");

      for (const movie of movies.results) {
        const movieContainer = document.createElement("div"),
          moviePoster = document.createElement("img"),
          movieTitle = document.createElement("h3"),
          movieRating = document.createElement("P");

        movieContainer.setAttribute("id", movie.id);
        movieContainer.setAttribute("class", "movie");
        moviePoster.setAttribute("class", "movie-poster");
        moviePoster.setAttribute(
          "src",
          "https://image.tmdb.org/t/p/w500" + movie.poster_path
        );
        movieTitle.setAttribute("class", "title");
        movieRating.setAttribute("class", "rating");

        if (movie.original_title.length > 17) {
          movieTitle.textContent = movie.original_title.slice(0, 17) + "...";

          movieTitle.setAttribute("title", movie.original_title);
        } else {
          movieTitle.textContent = movie.original_title;
        }

        movieRating.textContent = movie.vote_average + "/10";

        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(movieRating);

        popularMoviesContainer.appendChild(movieContainer);
      }
    })
    .catch((error) => {
      console.log("rejected:", error.message);
    });
};

const getTopRated = async () => {
  const topRatedUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=ec002527d6c6ee4ad05b7a57a673a4c6";

  const topRatedResponse = await fetch(topRatedUrl);

  if (topRatedResponse.status !== 200) {
    throw new Error("Failed to get now playing movies");
  }

  const topRatedMovies = topRatedResponse.json();

  return topRatedMovies;
};

const loadTopRated = () => {
  getTopRated()
    .then(function (movies) {
      const topRatedMoviesContainer = document.querySelector("#toprated");

      for (const movie of movies.results) {
        const movieContainer = document.createElement("div"),
          moviePoster = document.createElement("img"),
          movieTitle = document.createElement("h3"),
          movieRating = document.createElement("P");

        movieContainer.setAttribute("id", movie.id);
        movieContainer.setAttribute("class", "movie");
        moviePoster.setAttribute("class", "movie-poster");
        moviePoster.setAttribute(
          "src",
          "https://image.tmdb.org/t/p/w500" + movie.poster_path
        );
        movieTitle.setAttribute("class", "title");
        movieRating.setAttribute("class", "rating");

        if (movie.original_title.length > 17) {
          movieTitle.textContent = movie.original_title.slice(0, 17) + "...";

          movieTitle.setAttribute("title", movie.original_title);
        } else {
          movieTitle.textContent = movie.original_title;
        }

        movieRating.textContent = movie.vote_average + "/10";

        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(movieRating);

        topRatedMoviesContainer.appendChild(movieContainer);
      }
    })
    .catch(function (error) {
      console.log("Rejected:", error.message);
    });
};

const getUpcomming = async () => {
  const upcommingUrl =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=ec002527d6c6ee4ad05b7a57a673a4c6";

  const upcommingResponse = await fetch(upcommingUrl);

  if (upcommingResponse.status !== 200) {
    throw new Error("Failed to get now playing movies");
  }

  const upcommingMovies = upcommingResponse.json();

  return upcommingMovies;
};

const loadUpcomming = () => {
  getUpcomming()
    .then(function (movies) {
      const upCommingMoviesContainer = document.querySelector("#upcomming");

      for (const movie of movies.results) {
        const movieContainer = document.createElement("div"),
          moviePoster = document.createElement("img"),
          movieTitle = document.createElement("h3"),
          movieRating = document.createElement("P");

        movieContainer.setAttribute("id", movie.id);
        movieContainer.setAttribute("class", "movie");
        moviePoster.setAttribute("class", "movie-poster");
        moviePoster.setAttribute(
          "src",
          "https://image.tmdb.org/t/p/w500" + movie.poster_path
        );
        movieTitle.setAttribute("class", "title");
        movieRating.setAttribute("class", "rating");

        if (movie.original_title.length > 17) {
          movieTitle.textContent = movie.original_title.slice(0, 17) + "...";

          movieTitle.setAttribute("title", movie.original_title);
        } else {
          movieTitle.textContent = movie.original_title;
        }

        movieRating.textContent = movie.vote_average + "/10";

        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(movieRating);

        upCommingMoviesContainer.appendChild(movieContainer);
      }
    })
    .catch(function (error) {
      console.log("Rejected:", error.message);
    });
};

// search

const form = document.querySelector("#search-form"),
  searchValue = document.querySelector(".search-info"),
  searchField = document.querySelector(".search"),
  resultsContainer = document.querySelector(".results-container");

form.addEventListener("submit", changePath);

const searchMovie = async () => {
  const searchUrl =
    "https://api.themoviedb.org/3/search/movie?api_key=ec002527d6c6ee4ad05b7a57a673a4c6&query=";

  const searchedMovieResponse = await fetch(searchUrl + searchField.value);

  if (searchedMovieResponse.status !== 200) {
    if (searchField.value === "") {
      alert("Please enter the movie name that you want to search for");
    }
    throw new Error("The searched movie is not found.");
  }

  const searchedMovie = searchedMovieResponse.json();

  return searchedMovie;
};

function changePath(e) {
  e.preventDefault();

  clearHomeContent();

  clearContent();

  searchMovie()
    .then(function (movies) {
      searchValue.textContent = "Results for : " + searchField.value;

      for (const movie of movies.results) {
        const movieContainer = document.createElement("div"),
          moviePoster = document.createElement("img"),
          movieTitle = document.createElement("h3"),
          movieRating = document.createElement("P");

        movieContainer.setAttribute("class", "searched-movie");
        moviePoster.setAttribute("class", "movie-poster");

        if (movie.poster_path) {
          moviePoster.setAttribute(
            "src",
            "https://image.tmdb.org/t/p/w500" + movie.poster_path
          );
        } else {
          movieContainer.style.display = "none";
        }

        movieTitle.setAttribute("class", "title");
        movieRating.setAttribute("class", "rating");

        if (movie.title.length > 17) {
          movieTitle.textContent = movie.title.slice(0, 17) + "...";

          movieTitle.setAttribute("title", movie.title);
        } else {
          movieTitle.textContent = movie.title;
        }

        movieRating.textContent = movie.vote_average + "/10";

        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(movieRating);

        resultsContainer.appendChild(movieContainer);
      }

      console.log(movies);
    })
    .catch(function (error) {
      console.log("Rejected:", error.message);
    });
}

const clearHomeContent = () => {
  const contentContainer = document.querySelector(".content-container");

  const children = Array.from(contentContainer.children);

  children.forEach((child) => child.remove());
};

const clearContent = () => {
  while (resultsContainer.hasChildNodes()) {
    resultsContainer.lastElementChild.remove();
  }
};
