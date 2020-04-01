class DOM {
  constructor(DOMcallbacks) {
    if (DOMcallbacks) {
      this.DOMcallbacks = DOMcallbacks
    }
  }
}

class Movie extends DOM {
  constructor(movie1Input, movie2Input, dropdownItem, callbacks, DOMcallbacks) {
    super(DOMcallbacks)
    this.movie1Input = movie1Input
    this.movie2Input = movie2Input
    this.dropdownItem = dropdownItem

    if (callbacks) {
      this.movieData = callbacks.movieData
    }
    this.movie1Input.addEventListener(
      'input',
      this.debounce(this.getSearchData)
    )
  }
  debounce = (callback) => {
    this.timerID
    return (...args) => {
      if (this.timerID) {
        clearTimeout(this.timerID)
      }
      this.timerID = setTimeout(() => {
        return callback()
      }, 500)
    }
  }

  getSearchData = async () => {
    const movies = await this.fetchData()
    if (!movies.data.Error) {
      this.dropdownItem.classList.toggle('is-active')
      for (let movie of movies.data.Search) {
        console.log(movie)
        document
          .querySelector('.dropdown-content')
          .insertAdjacentHTML('afterbegin', this.DOMcallbacks.addHTML(movie))
      }
    } else {
      console.log(movies.data.Error)
    }
  }

  fetchData = async () => {
    return await axios
      .get('http://www.omdbapi.com/', {
        params: {
          apikey: 'df784551',
          s: this.movie1Input.value,
        },
      })
      .then((res) => {
        console.log('Connected to OMDB server')
        return res
      })
      .catch((err) => {
        console.log('Something went wrong with OMDB server. Try again', err)
      })
  }
}

//{Title: "Batman: The Dark Knight Returns, Part 2", Year: "2013", imdbID: "tt2166834", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BYTEzMmE0ZD…WM3ZjA0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"}Title: "Batman: The Dark Knight Returns, Part 2"Year: "2013"imdbID: "tt2166834"Type: "movie"Poster: "https://m.media-amazon.com/images/M/MV5BYTEzMmE0ZDYtYWNmYi00ZWM4LWJjOTUtYTE0ZmQyYWM3ZjA0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"__proto__: Object
