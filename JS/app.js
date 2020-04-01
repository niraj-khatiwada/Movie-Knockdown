class Movie {
  constructor(movie1Input, movie2Input, callbacks) {
    this.movie1Input = movie1Input
    this.movie2Input = movie2Input

    if (callbacks) {
      this.callbacks = callbacks
    }
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
    const movies = await this.fetchSearchData()
    document.querySelector('.dropdown-content').innerHTML = ''
    if (!movies.data.Error) {
      this.callbacks.addDropdown()
      for (let movie of movies.data.Search) {
        console.log(movie)
        this.callbacks.addHTML(movie)
        this.callbacks.onAnchorClick(movie)
      }
      this.fetchMovieDetails()
      this.callbacks.closeDropdown()
    } else {
      this.callbacks.addDropdown()
      document.querySelector('.dropdown-content').innerHTML = `
      <div style="text-align:center; height:20px; color:red">
        <p>No matching movies found </p>
      </div>
      `
      this.callbacks.closeDropdown()
      console.log(movies.data.Error)
    }
  }

  fetchSearchData = async () => {
    let inputNum
    if (this.movie1Input.value) {
      inputNum = this.movie1Input.value
    } else {
      inputNum = this.movie2Input.value
    }
    return await axios
      .get('http://www.omdbapi.com/', {
        params: {
          apikey: 'df784551',
          s: inputNum,
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

  fetchMovieDetails = async () => {
    console.log('IMDB ID is', this.movie1Input.value)
    // if (imdbID) {
    //   return await axios
    //     .get('http://www.omdbapi.com/', {
    //       params: {
    //         apikey: 'df784551',
    //         t: imdbID,
    //       },
    //     })
    //     .then((res) => {
    //       console.log('Movie Data Fetched', res)
    //       return res
    //     })
    //     .catch((err) => {
    //       console.log("Movie Details couldn't be fetched. Try again")
    //     })
    // }
  }
}
