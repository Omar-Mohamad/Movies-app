// Logo animation

const logo = document.querySelectorAll("#logo path");

logo.forEach(function (letter) {
  letter.style.strokeDasharray = letter.getTotalLength();
  letter.style.strokeDashoffset = letter.getTotalLength();
});

// Selecting elements

const form = document.querySelector("#search-form"),
  searchField = document.querySelector(".search"),
  searchValue = document.querySelector(".search-info"),
  resultsContainer = document.querySelector(".results-container");

const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=ec002527d6c6ee4ad05b7a57a673a4c6&query=";

// Getting movies from the search

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

function clearContent() {
  while (resultsContainer.hasChildNodes()) {
    resultsContainer.lastElementChild.remove();
  }
}
