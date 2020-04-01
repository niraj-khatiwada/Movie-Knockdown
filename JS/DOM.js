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
        !movie2Input.contains(evt.target)
      ) {
        dropdownItem.classList.remove('is-active')
      } else if (movie2Input.value === '') {
        dropdownItem.classList.remove('is-active')
      }
    })
  },
  onAnchorClick(movie) {
    const anchor = document.querySelector('.dropdown-item')
    return anchor.addEventListener('click', () => {
      dropdownItem.classList.remove('is-active')
      movie2Input.value = movie.Title
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
    <div class="poster-and-briefs">
      <div class="poster">
      <img src="${movieDetail.Poster}" alt="">
      </div>
      <div class="briefs">
        <h1><strong>${movieDetail.Title}</strong>(${movieDetail.Year})</h1>
        <p class="briefing">${movieDetail.Plot}</p>
        <div>
        <strong>Genre:</strong><p> ${movieDetail.Genre}</p>
        </div>
        <div>
        <strong>Released Date: </strong><p> ${movieDetail.Released}</p>
        </div>
        <div>
        <strong>Casts: </strong><p> ${movieDetail.Actors}</p>
        </div>
      </div>
    </div>
    <div class="box-office">
      <strong>Box-Office: </strong><h3>${movieDetail.BoxOffice}</h3>
    </div>
    <div class="awards">
      <strong>Awards: </strong><h3>${movieDetail.Awards}</h3>
    </div>
    <div class="metascore">
      <strong>Metascore: </strong><h3>${movieDetail.Metascore}</h3>
    </div>
    <div class="imdbRating">
      <strong>IMDB Rating: </strong><h3>${movieDetail.imdbRating}</h3>
    </div>
    <div class="imdbRating">
      <strong>IMDB Votes: </strong><h3>${movieDetail.imdbVotes}</h3>
    </div>
    `
    const column1 = document.querySelector('.column-2')
    column1.innerHTML = text
  },
})
