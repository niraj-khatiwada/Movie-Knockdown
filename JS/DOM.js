const movie0input = document.querySelector('#movie0')
const movie1input = document.querySelector('#movie1')

const dropdownItem = document.querySelectorAll('.dropdown')

const movieObj = new Movie(movie0input, movie1input, {
  addHTML(movie, inputNum) {
    if (movie.Poster === 'N/A') {
      movie.Poster = '/Image/no-poster-available.jpg'
    }
    const text = `
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
      if (
        !dropdownItem[inputNum].contains(evt.target) ||
        movie0input.value === '' ||
        movie1input.value === ''
      ) {
        dropdownItem[inputNum].classList.remove('is-active')
      }
    })
  },
  noMatchingMovies(inputNum) {
    document.querySelectorAll('.dropdown-content')[inputNum].innerHTML = `
    <div style="text-align:center; height:20px; color:red">
      <p>No matching movies found </p>
    </div>
    `
  },
  showMovieDetails(movieDetail, inputNum) {
    const text0 = `
    <div class="poster-and-briefs">
      <div class="briefs">
        <h1><strong>${movieDetail.Title}</strong>(${movieDetail.Year})</h1>
        <p class="briefing">${movieDetail.Plot}</p>
        <div>
        <strong>Genre:</strong><p> ${movieDetail.Genre}</p>
        </div>
        <div>
        <strong>Released Date: </strong><p> ${movieDetail.Released}, ${movieDetail.Country}</p>
        </div>
        <div>
        <strong>Casts: </strong><p> ${movieDetail.Actors}</p>
        </div>
      </div>
      <div class="poster">
      <img src="${movieDetail.Poster}" alt="">
      </div>
    </div>
    <div class = 'leftSide'>
      
    </div>
    `
    const text1 = `
    <div class="poster-and-briefs1">
      <div class="poster1">
      <img src="${movieDetail.Poster}" alt="">
      </div>
      <div class="briefs1">
        <h1><strong>${movieDetail.Title}</strong>(${movieDetail.Year})</h1>
        <p class="briefing1">${movieDetail.Plot}</p>
        <div>
        <strong>Genre:</strong><p> ${movieDetail.Genre}</p>
        </div>
        <div>
        <strong>Released Date: </strong><p> ${movieDetail.Released}, ${movieDetail.Country}</p>
        </div>
        <div>
        <strong>Casts: </strong><p> ${movieDetail.Actors}</p>
        </div>
      </div>
    </div>
    <div class = 'rightSide'> 
      
    </div>
    `
    const side = `
      <div class="box-office">
        <strong>Box-Office: </strong><h3>${movieDetail.BoxOffice}</h3>
      </div>
      <div class="awards">
        <strong>Awards: </strong><h4>${movieDetail.Awards}</h4>
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
    
    if (inputNum === 0) {
      document.querySelector(`.column-0`).innerHTML = text0
      document.querySelector('.leftSide').innerHTML = side
    } else {
      document.querySelector(`.column-1`).innerHTML = text1
      document.querySelector('.rightSide').innerHTML = side
    }

    this.cleanData(movieDetail)


    const leftSide = document.querySelectorAll('.leftSide div')
    const rightSide = document.querySelectorAll('.rightSide div')
    if (leftSide && rightSide) {
      this.startComparision(leftSide, rightSide)
    }
  },
  startComparision(left, right) {
    console.log(right)
    left.forEach((value, index) => {
      console.log(value, index)
      console.log(right[index])
    })
  },
  cleanData(movieDetail) {
    const boxOffice =parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g,''))
    const metascore = parseInt(movieDetail.metascore)
    const imdbRating = parseFloat(movieDetail.imdbRating)
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''))
    console.log(boxOffice, metascore, imdbRating, imdbVotes)
  }
})
