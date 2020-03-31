class Movie {
  constructor(movie1Input, movie2Input, callbacks) {
    if ((movie1Input, callbacks)) {
      this.movieData = callbacks.movieData
      this.movie1Input = movie1Input
      this.movie2Input = movie2Input
    }
    // this.movie1Input.addEventListener('input', this.fetchData)
    this.movie1Input.addEventListener('input', this.debounce)
  }
  debounce = () => {
    this.timerID
    const onlyLastInput = () => {
      if (this.timerID) {
        clearTimeout(this.timerID)
      }
      this.timerID = setTimeout(async () => {
        const movies = await this.fetchData()
        movies.then((res) => {
          console.log('Fetched')
          console.log(res)
        })
        .catch((err) => {
          console.log("Din't get response from server")
        })
      }, 3000)
    }
    return onlyLastInput()
  }
  fetchData = async () => {
    return await axios
      .get('http://www.ombapi.com/', {
        params: {
          apikey: 'df784551',
          s: this.movie1Input.value,
        },
      })
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log('Something went wrong with OMDB server. Try again', err)
      })
  }
}
