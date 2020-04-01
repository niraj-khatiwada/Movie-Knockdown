const movie1Input = document.querySelector('#movie1')
const movie2Input = document.querySelector('#movie2')

const dropdownItem = document.querySelector('.dropdown')

const movieObj = new Movie(movie1Input, movie2Input, {
  addHTML(movie) {
    if (movie.Poster === 'N/A') {
      movie.Poster = '/Image/no-poster-available.jpg'
    }
    let text = `
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
    return document
      .querySelector('.dropdown-content')
      .insertAdjacentHTML('afterbegin', text)
  },
  addDropdown() {
    return dropdownItem.classList.add('is-active')
  },
  closeDropdown() {
    document.addEventListener('click', (evt) => {
      if (
        !dropdownItem.contains(evt.target) &&
        !movie1Input.contains(evt.target)
      ) {
        dropdownItem.classList.remove('is-active')
      } else if (movie1Input.value === '') {
        dropdownItem.classList.remove('is-active')
      }
    })
  },
  onAnchorClick(movie) {
    const anchor = document.querySelector('.dropdown-item')
    anchor.addEventListener('click', () => {
      dropdownItem.classList.remove('is-active')
      movie1Input.value = movie.Title
    })
  },
})
