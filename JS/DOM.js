const movie1Input = document.querySelector('#movie1')
const movie2Input = document.querySelector('#movie2')

const movieObj = new Movie(movie1Input, movie2Input, {
  movieData(movieName) {
    console.log(movieName)
  },
})
