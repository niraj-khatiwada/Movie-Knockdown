class Movie {
  constructor(movie0Input, movie1Input, callbacks) {
    this.movie0Input = movie0Input
    this.movie1Input = movie1Input
    if (callbacks) {
      this.callbacks = callbacks
    }
    this.movie0Input.addEventListener(
      'input',
      this.debounce(this.getSearchData)
    )
    this.movie1Input.addEventListener(
      'input',
      this.debounce(this.getSearchData)
    )
  }
  debounce = (callback) => {
    this.timerID
    return () => {
      if (this.timerID) {
        clearTimeout(this.timerID)
      }
      this.timerID = setTimeout(() => {
        return callback()
      }, 500)
    }
  }

  getSearchData = async () => {
    this.inputNum
    if (document.activeElement.id === 'movie0') {
      this.inputNum = 0
    } else if (document.activeElement.id == 'movie1') {
      this.inputNum = 1
    }
    document.querySelectorAll('.dropdown-content')[this.inputNum].innerHTML = ''
    const movies = await this.fetchSearchData()
    if (!movies.data.Error) {
      this.callbacks.addDropdown(this.inputNum)
      for (let movie of movies.data.Search) {
        this.callbacks.addHTML(movie, this.inputNum)
        this.onAnchorClick(movie)
      }
      this.callbacks.closeDropdown(this.inputNum)
    } else {
      this.callbacks.addDropdown(this.inputNum)
      this.callbacks.noMatchingMovies(this.inputNum)
      this.callbacks.closeDropdown(this.inputNum)
      // console.log(movies.data.Error)
    }
  }

  fetchSearchData = async () => {
    let skey
    if (this.inputNum == 0) {
      skey = this.movie0Input.value
    } else {
      skey = this.movie1Input.value
    }
    return await axios
      .get('http://www.omdbapi.com/', {
        params: {
          apikey: this.API_KEY,
          s: skey,
        },
      })
      .then((res) => {
        console.log('Connected to OMDB server', res)
        return res
      })
      .catch((err) => {
        console.log('Something went wrong with OMDB server. Try again', err)
      })
  }
  onAnchorClick = (movie) => {
    const anchor = document.querySelector(`.dropdown-item-${this.inputNum}`)
    return anchor.addEventListener('click', () => {
      dropdownItem[this.inputNum].classList.remove('is-active')
      if (this.inputNum === 0) {
        movie0input.value = movie.Title
      } else if (this.inputNum === 1) {
        movie1input.value = movie.Title
      }
      this.getmovieDetails(movie.imdbID)
    })
  }
  getmovieDetails = async (imdbID) => {
    if (imdbID) {
      const { API_KEY } = process.env
      await axios
        .get('http://www.omdbapi.com/', {
          params: {
            apikey: API_KEY,
            i: imdbID,
          },
        })
        .then((res) => {
          console.log('Movie Detail: ', res)
          return this.callbacks.showMovieDetails(res.data, this.inputNum)
        })
        .catch((err) => {
          console.log("Movie Details couldn't be fetched. Try again", err)
        })
    }
  }
}
