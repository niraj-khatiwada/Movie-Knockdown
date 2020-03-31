const movie1Input = document.querySelector('#movie1')
const movie2Input = document.querySelector('#movie2')

const dropdownItem = document.querySelector('.dropdown')

const movieObj = new Movie(
  movie1Input,
  movie2Input,
  dropdownItem,
  {
    movieData(movieName) {
      console.log(movieName)
    },
  }
)
