class Movie {
  constructor(movie1Input, movie2Input, dropdownItem, callbacks) {
    this.movie1Input = movie1Input
    this.movie2Input = movie2Input
    this.dropdownItem = dropdownItem
    if (callbacks) {
      this.movieData = callbacks.movieData
    }
    // this.movie1Input.addEventListener('input', this.fetchData)
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
        let text = `
        <a href= "#" class="dropdown-item">
          <div>
          <h1>Movie name</h1>
          <i class="fas fa-facebook"></i>
          </div>
        </a>
        `
        document.querySelector(".dropdown-content").insertAdjacentHTML("afterbegin", text)
        console.log(movie)
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
