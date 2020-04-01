const movie0input = document.querySelector('#movie0')
const movie1input = document.querySelector('#movie1')

const dropdownItem = document.querySelectorAll('.dropdown')

const movieObj = new Movie(movie0input, movie1input, {
  addHTML(movie, inputNum) {
    if (movie.Poster === 'N/A') {
      movie.Poster = '/Image/no-poster-available.jpg'
    }
    let text = `
    <a href="#" class="dropdown-item-${inputNum}">
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
      .querySelectorAll('.dropdown-content')
      [inputNum].insertAdjacentHTML('afterbegin', text)
  },
  addDropdown(inputNum) {
    return dropdownItem[inputNum].classList.add('is-active')
  },
  closeDropdown(inputNum) {
    document.addEventListener('click', (evt) => {
      if (!dropdownItem[inputNum].contains(evt.target)) {
        dropdownItem[inputNum].classList.remove('is-active')
      } else if (movie0input.value === '' || movie1input.value === '') {
        dropdownItem[inputNum].classList.remove('is-active')
      }
    })
  },
  onAnchorClick(movie, inputNum) {
    const anchor = document.querySelector(`.dropdown-item-${inputNum}`)
    return anchor.addEventListener('click', () => {
      console.log('AnchorClick inside event listener', inputNum)
      dropdownItem[inputNum].classList.remove('is-active')
      if (inputNum === 0) {
        movie0input.value = movie.Title
      } else if (inputNum === 1) {
        movie1input.value = movie.Title
      }
      this.getmovieDetails(movie.imdbID, inputNum)
    })
  },
  async getmovieDetails(imdbID, inputNum) {
    console.log('Imdb Id is', imdbID)
    if (imdbID) {
      await axios
        .get('http://www.omdbapi.com/', {
          params: {
            apikey: 'df784551',
            i: imdbID,
          },
        })
        .then((res) => {
          return this.showMovieDetails(res.data, inputNum)
        })
        .catch((err) => {
          console.log("Movie Details couldn't be fetched. Try again", err)
        })
    }
  },
  showMovieDetails(movieDetail, inputNum) {
    console.log('Movie Detail', movieDetail)
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
    const column1 = document.querySelector(`.column-${inputNum}`)
    column1.innerHTML = text
  },
})
