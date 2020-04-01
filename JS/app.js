class Movie {
  constructor(movie1Input, movie2Input, callbacks) {
    this.movie1Input = movie1Input
    this.movie2Input = movie2Input

    if (callbacks) {
      this.callbacks = callbacks
    }
    this.movie2Input.addEventListener(
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
        this.callbacks.addHTML(movie)
        this.callbacks.onAnchorClick(movie)
      }
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
    if (this.movie2Input.value) {
      inputNum = this.movie2Input.value
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
}
