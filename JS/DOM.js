const movie1Input = document.querySelector('#movie1')
const movie2Input = document.querySelector('#movie2')

const dropdownItem = document.querySelector('.dropdown')

const DOMObj = new DOM({
  addHTML(movie) {
    return `
    <a href="#" class="dropdown-item">
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
  },
  text:
})

const movieObj = new Movie(movie1Input, movie2Input, dropdownItem, {
  movieData(movieName) {
    console.log(movieName)
  },
}, DOMObj.DOMcallbacks)
