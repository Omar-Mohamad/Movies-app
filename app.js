// Logo animation

const logo = document.querySelectorAll("#logo path");

logo.forEach(function (letter) {
  letter.style.strokeDasharray = letter.getTotalLength();
  letter.style.strokeDashoffset = letter.getTotalLength();
});

// Selecting elements

const form = document.querySelector("#search-form"),
  searchField = document.querySelector(".search"),
  searchBtn = document.querySelector(".search-btn"),
  toprated = document.querySelector("#top"),
  upcomming = document.querySelector("#upcomming"),
  bannerContainer = document.querySelector(".banner-container"),
  randomMovieTitle = document.querySelector(".movie-title"),
  randomMovieDiscription = document.querySelector(".movie-discription"),
  nowPlayingMoviesContainer = document.querySelector("#nowplaying"),
  topRatedMoviesContainer = document.querySelector("#toprated"),
  upCommingMoviesContainer = document.querySelector("#upcomming");

const contentContainer = document.querySelector(".content-container");

const searchValue = document.querySelector(".search-info");

const resultsContainer = document.querySelector(".results-container");

// API data
const topRatedUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=ec002527d6c6ee4ad05b7a57a673a4c6",
  upcommingUrl =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=ec002527d6c6ee4ad05b7a57a673a4c6",
  popularUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=ec002527d6c6ee4ad05b7a57a673a4c6",
  nowPlayingUrl =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=ec002527d6c6ee4ad05b7a57a673a4c6";

const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=ec002527d6c6ee4ad05b7a57a673a4c6&query=";

// Getting the Now playing movies

window.addEventListener("load", loadMovies);

function loadMovies() {
  loadNowPlaying();
  loadTopRated();
  loadUpcomming();
}

async function getNowPlaying() {
  const nowPlaynigResponse = await fetch(nowPlayingUrl);

  if (nowPlaynigResponse.status !== 200) {
    throw new Error("Failed to get now playing movies");
  }

  const nowPlaynigMovies = nowPlaynigResponse.json();

  return nowPlaynigMovies;
}

function loadNowPlaying() {
  getNowPlaying()
    .then(function (data) {
      const randomMovie =
        data.results[Math.floor(Math.random() * data.results.length)];

      bannerContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${randomMovie.backdrop_path})`;

      randomMovieTitle.textContent = randomMovie.title;

      randomMovieDiscription.textContent = randomMovie.overview;

      for (let i = 0; i < data.results.length; i++) {
        const movieContainer = document.createElement("div"),
          moviePoster = document.createElement("img"),
          movieTitle = document.createElement("h3"),
          movieRating = document.createElement("P");

        movieContainer.setAttribute("class", "movie");
        moviePoster.setAttribute("class", "movie-poster");
        moviePoster.setAttribute(
          "src",
          "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path
        );
        movieTitle.setAttribute("class", "title");
        movieRating.setAttribute("class", "rating");

        if (data.results[i].title.length > 17) {
          movieTitle.textContent = data.results[i].title.slice(0, 17) + "...";

          movieTitle.setAttribute("title", data.results[i].title);
        } else {
          movieTitle.textContent = data.results[i].title;
        }

        movieRating.textContent = data.results[i].vote_average + "/10";

        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(movieRating);

        nowPlayingMoviesContainer.appendChild(movieContainer);
      }
    })
    .catch(function (error) {
      console.log("Rejected:", error.message);
    });
}

async function getTopRated() {
  const topRatedResponse = await fetch(topRatedUrl);

  if (topRatedResponse.status !== 200) {
    throw new Error("Failed to get now playing movies");
  }

  const topRatedMovies = topRatedResponse.json();

  return topRatedMovies;
}

function loadTopRated() {
  getTopRated()
    .then(function (data) {
      for (let i = 0; i < data.results.length; i++) {
        const movieContainer = document.createElement("div"),
          moviePoster = document.createElement("img"),
          movieTitle = document.createElement("h3"),
          movieRating = document.createElement("P");

        movieContainer.setAttribute("class", "movie");

        moviePoster.setAttribute("class", "movie-poster");

        moviePoster.setAttribute(
          "src",
          "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path
        );

        movieTitle.setAttribute("class", "title");

        movieRating.setAttribute("class", "rating");

        if (data.results[i].title.length > 17) {
          movieTitle.textContent = data.results[i].title.slice(0, 17) + "...";

          movieTitle.setAttribute("title", data.results[i].title);
        } else {
          movieTitle.textContent = data.results[i].title;
        }

        movieRating.textContent = data.results[i].vote_average + "/10";

        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(movieRating);

        topRatedMoviesContainer.appendChild(movieContainer);
      }
    })
    .catch(function (error) {
      console.log("Rejected:", error.message);
    });
}

async function getUpcomming() {
  const upcommingResponse = await fetch(upcommingUrl);

  if (upcommingResponse.status !== 200) {
    throw new Error("Failed to get now playing movies");
  }

  const upcommingMovies = upcommingResponse.json();

  return upcommingMovies;
}

function loadUpcomming() {
  getUpcomming()
    .then(function (data) {
      for (let i = 0; i < data.results.length; i++) {
        const movieContainer = document.createElement("div"),
          moviePoster = document.createElement("img"),
          movieTitle = document.createElement("h3"),
          movieRating = document.createElement("P");

        movieContainer.setAttribute("class", "movie");
        moviePoster.setAttribute("class", "movie-poster");
        moviePoster.setAttribute(
          "src",
          "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path
        );
        movieTitle.setAttribute("class", "title");
        movieRating.setAttribute("class", "rating");

        if (data.results[i].title.length > 17) {
          movieTitle.textContent = data.results[i].title.slice(0, 17) + "...";

          movieTitle.setAttribute("title", data.results[i].title);
        } else {
          movieTitle.textContent = data.results[i].title;
        }

        movieRating.textContent = data.results[i].vote_average + "/10";

        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(movieRating);

        upCommingMoviesContainer.appendChild(movieContainer);
      }
    })
    .catch(function (error) {
      console.log("Rejected:", error.message);
    });
}

form.addEventListener("submit", changePath);

async function searchMovie() {
  const searchedMovieResponse = await fetch(searchUrl + searchField.value);

  if (searchedMovieResponse.status !== 200) {
    if (searchField.value === "") {
      alert("Please enter the movie name that you want to search for");
    }
    throw new Error("The searched movie is not found.");
  }

  const searchedMovie = searchedMovieResponse.json();

  return searchedMovie;
}

function changePath(e) {
  e.preventDefault();

  clearHomeContent();

  clearContent();

  searchMovie()
    .then(function (data) {
      searchValue.textContent = "Results for : " + searchField.value;

      for (let i = 0; i < data.results.length; i++) {
        const movieContainer = document.createElement("div"),
          moviePoster = document.createElement("img"),
          movieTitle = document.createElement("h3"),
          movieRating = document.createElement("P");

        movieContainer.setAttribute("class", "searched-movie");
        moviePoster.setAttribute("class", "movie-poster");

        if (data.results[i].poster_path) {
          moviePoster.setAttribute(
            "src",
            "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path
          );
        } else {
          movieContainer.style.display = "none";
        }

        movieTitle.setAttribute("class", "title");
        movieRating.setAttribute("class", "rating");

        if (data.results[i].title.length > 17) {
          movieTitle.textContent = data.results[i].title.slice(0, 17) + "...";

          movieTitle.setAttribute("title", data.results[i].title);
        } else {
          movieTitle.textContent = data.results[i].title;
        }

        movieRating.textContent = data.results[i].vote_average + "/10";

        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(movieRating);

        resultsContainer.appendChild(movieContainer);
      }
      console.log(data);
    })
    .catch(function (error) {
      console.log("Rejected:", error.message);
    });
}

function clearHomeContent() {
  bannerContainer.style.display = "none";

  contentContainer.style.display = "none";
}

function clearContent() {
  while (resultsContainer.hasChildNodes()) {
    resultsContainer.lastElementChild.remove();
  }
}
