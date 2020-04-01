const movie1Input = document.querySelector('#movie1')
const movie2Input = document.querySelector('#movie2')

const dropdownItem = document.querySelector('.dropdown')

const movieObj = new Movie(movie1Input, movie2Input, {
  addHTML(movie) {
    if (movie.Poster === 'N/A') {
      movie.Poster = '/Image/no-poster-available.jpg'
    }
    let text = `
    <a href="#" class="dropdown-item">
      <div style="display: grid;grid-template-columns: auto 1fr;gap: 1rem; ">
        <div class="image" style="width: 40px;"> 
          <img src="${movie.Poster}" alt="N/A" width="100%">
        </div>
        <div style="text-align: left;overflow:hidden; text-overflow:ellipsis;">
          <strong >${movie.Title}</strong>
          <p>${movie.Year}</p>
        </div>
      </div>
    </a>
    `
    return document
      .querySelector('.dropdown-content')
      .insertAdjacentHTML('afterbegin', text)
  },
  addDropdown() {
    return dropdownItem.classList.add('is-active')
  },
  closeDropdown() {
    document.addEventListener('click', (evt) => {
      if (
        !dropdownItem.contains(evt.target) &&
        !movie1Input.contains(evt.target)
      ) {
        dropdownItem.classList.remove('is-active')
      } else if (movie1Input.value === '') {
        dropdownItem.classList.remove('is-active')
      }
    })
  },
  onAnchorClick(movie) {
    const anchor = document.querySelector('.dropdown-item')
    return anchor.addEventListener('click', () => {
      dropdownItem.classList.remove('is-active')
      movie1Input.value = movie.Title
      this.getmovieDetails(movie.imdbID)
    })
  },
  async getmovieDetails(imdbID) {
    if (imdbID) {
      await axios
        .get('http://www.omdbapi.com/', {
          params: {
            apikey: 'df784551',
            i: imdbID,
          },
        })
        .then((res) => {
          return this.showMovieDetails(res.data)
        })
        .catch((err) => {
          console.log("Movie Details couldn't be fetched. Try again", err)
        })
    }
  },
  showMovieDetails(movieDetail) {
    console.log(movieDetail)
    let text = `
    <h1>${movieDetail.Title}</h1>
    <div class="poster-and-briefs">
      <div class="poster">
        <img src="${movieDetail.Poster}" alt="">
      </div>
      <div class="briefs">
        <p class="briefing">${movieDetail.Plot}</p>
      </div>
    </div>
    `
    const column1 = document.querySelector('.column-1')
    column1.innerHTML = text
  },
})

// Title: "Avengers Assemble"
// Year: "2013–"
// Rated: "TV-Y7"
// Released: "26 May 2013"
// Runtime: "23 min"
// Genre: "Animation, Action, Adventure, Sci-Fi"
// Director: "N/A"
// Writer: "Jack Kirby, Joe Simon, Stan Lee"
// Actors: "Roger Craig Smith, Troy Baker, Fred Tatasciore, Travis Willingham"
// Plot: "The further adventures of the Marvel Universe's mightiest general membership superhero team."
// Language: "English"
// Country: "USA"
// Awards: "11 nominations."
// Poster: "https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg"
// Ratings: [{…}]
// Metascore: "N/A"
// imdbRating: "7.0"
// imdbVotes: "6,168"
// imdbID: "tt2455546"
// Type: "series"
// totalSeasons: "5"
// Response: "True"
