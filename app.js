// Logo animation

const logo = document.querySelectorAll("#logo path");

logo.forEach((letter) => {
  letter.style.strokeDasharray = letter.getTotalLength();
  letter.style.strokeDashoffset = letter.getTotalLength();
});

// Getting the Now playing movies

/* .scroll-icon-left
.scroll-icon-right
 */

const loadMovies = () => {
  document.querySelector(".preloader-container").style.display = "none";
  scrollMoviesRow();
  loadNowPlaying();
  loadPopular();
  loadTopRated();
  loadUpcomming();
};

window.addEventListener("load", loadMovies);

// Row scrolling function

const scrollMoviesRow = () => {
  const moviesRow = Array.from(document.querySelectorAll(".movies-container")),
    rightIcons = Array.from(document.querySelectorAll(".scroll-icon-right")),
    leftIcons = Array.from(document.querySelectorAll(".scroll-icon-left"));

  rightIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const targetMoviesRow = moviesRow.filter(
        (movieRow) =>
          movieRow.getAttribute("data-set-id") ===
          icon.getAttribute("data-set-id")
      );

      targetMoviesRow[0].scrollBy({
        left: 250,
        behavior: "smooth",
      });
    });
  });

  leftIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const targetMoviesRow = moviesRow.filter(
        (movieRow) =>
          movieRow.getAttribute("data-set-id") ===
          icon.getAttribute("data-set-id")
      );

      targetMoviesRow[0].scrollBy({
        left: -250,
        behavior: "smooth",
      });
    });
  });
};

// Render function

const createElements = (data, container) => {
  for (const movie of data.results) {
    const movieContainer = document.createElement("div"),
      moviePoster = document.createElement("img"),
      movieTitle = document.createElement("h3"),
      movieRating = document.createElement("P");

    movieContainer.setAttribute("id", movie.id);
    movieContainer.setAttribute("class", "movie");

    if (movie.poster_path) {
      moviePoster.setAttribute("class", "movie-poster");
      moviePoster.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/w500" + movie.poster_path
      );
      moviePoster.setAttribute("alt", `${movie.title} image`);
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

    container.appendChild(movieContainer);
  }
};

// Fetching functions

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
      const carouselInner = document.querySelector(".carousel-inner");

      for (const movie of movies.results) {
        const carouselItem = document.createElement("div"),
          carouselImage = document.createElement("img"),
          carouselCaptionContainer = document.createElement("div"),
          carouselMovieTitle = document.createElement("h2"),
          carouselMoviedescription = document.createElement("p");

        if (movie.backdrop_path) {
          carouselImage.setAttribute(
            "src",
            `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
          );
          carouselImage.setAttribute("alt", `${movie.title} image`);

          carouselMovieTitle.textContent = movie.title;
          carouselMoviedescription.textContent = movie.overview;

          carouselItem.classList.add("carousel-item");
          carouselImage.classList.add("my-carousel-img");
          carouselImage.classList.add("d-block");
          carouselImage.classList.add("w-100");
          carouselCaptionContainer.classList.add("carousel-caption");
          carouselMovieTitle.classList.add("movie-title");
          carouselMoviedescription.classList.add("movie-discription");
          carouselMoviedescription.classList.add("d-none");
          carouselMoviedescription.classList.add("d-md-block");

          carouselCaptionContainer.appendChild(carouselMovieTitle);
          carouselCaptionContainer.appendChild(carouselMoviedescription);

          carouselItem.appendChild(carouselImage);
          carouselItem.appendChild(carouselCaptionContainer);
          carouselInner.appendChild(carouselItem);
        }
      }

      const carouselItems = Array.from(
        document.querySelectorAll(".carousel-item")
      );
      carouselItems[0].classList.add("active");

      carouselItems.forEach((item) => {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        item.prepend(overlay);
      });

      const nowPlayingMoviesContainer = document.querySelector("#nowplaying");

      createElements(movies, nowPlayingMoviesContainer);
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

      createElements(movies, popularMoviesContainer);
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
    .then((movies) => {
      const topRatedMoviesContainer = document.querySelector("#toprated");

      createElements(movies, topRatedMoviesContainer);
    })
    .catch((error) => {
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
    .then((movies) => {
      const upCommingMoviesContainer = document.querySelector("#upcomming");

      createElements(movies, upCommingMoviesContainer);
    })
    .catch((error) => {
      console.log("Rejected:", error.message);
    });
};

// search

const form = document.querySelector("#search-form"),
  searchValue = document.querySelector(".search-info"),
  searchField = document.querySelector(".search"),
  resultsContainer = document.querySelector(".results-container");

form.addEventListener("submit", changeContent);

const searchMovie = async () => {
  const searchUrl =
    "https://api.themoviedb.org/3/search/movie?api_key=ec002527d6c6ee4ad05b7a57a673a4c6&query=";

  const searchedMovieResponse = await fetch(searchUrl + searchField.value);

  if (searchedMovieResponse.status !== 200) {
    throw new Error("The searched movie is not found.");
  }

  const searchedMovie = await searchedMovieResponse.json();

  return searchedMovie;
};

function changeContent(e) {
  e.preventDefault();

  searchMovie()
    .then((movies) => {
      searchValue.textContent = `Results for : ${searchField.value}`;

      document.title = `Results for : ${searchField.value}`;

      createElements(movies, resultsContainer);

      // console.log(movies);
    })
    .catch((error) => {
      console.log("Rejected:", error.message);
    });

  clearHomeContent();

  clearContent();
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
