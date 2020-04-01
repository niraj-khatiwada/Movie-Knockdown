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
    const movies = await this.fetchSearchData()
    this.inputNum
    if (document.activeElement.id === 'movie0') {
      this.inputNum = 0
    } else {
      this.inputNum = 1
    }
    document.querySelectorAll('.dropdown-content')[this.inputNum].innerHTML = ''
    if (!movies.data.Error) {
      this.callbacks.addDropdown(this.inputNum)
      for (let movie of movies.data.Search) {
        this.callbacks.addHTML(movie, this.inputNum)
        this.callbacks.onAnchorClick(movie, this.inputNum)
      }
      this.callbacks.closeDropdown(this.inputNum)
    } else {
      this.callbacks.addDropdown(this.inputNum)
      document.querySelectorAll('.dropdown-content')[this.inputNum].innerHTML = `
      <div style="text-align:center; height:20px; color:red">
        <p>No matching movies found </p>
      </div>
      `
      this.callbacks.closeDropdown(this.inputNum)
      console.log(movies.data.Error)
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
          apikey: 'df784551',
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
}
