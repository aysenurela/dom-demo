const addMovieModal = document.getElementById('add-modal')
const startAddMovieButton = document.querySelector('header button')
const backdrop = document.getElementById('backdrop')
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive')
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling
const userInputs = addMovieModal.querySelectorAll('input')
const entryTextSection = document.getElementById('entry-text')
const deleteMovieModal = document.getElementById('delete-modal')

const movies = []

const updateUI = () => {
  movies.length ? entryTextSection.style.display = 'none' : entryTextSection.style.display = 'block'
}

const closeMovieDeletionModal = () => {
  toggleBackdrop()
  deleteMovieModal.classList.remove('visible')
}

const deleteMovie = (movieId) => {
  let movieIndex = 0
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++
  }
  movies.splice(movieIndex, 1)
  const listRoot = document.getElementById('movie-list')
  listRoot.children[movieIndex].remove()
  closeMovieDeletionModal()
  updateUI()
}

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible')
  toggleBackdrop()
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive')
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true)) // to remove all eventlisteners
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal)
  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal)

  confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId)) // when you bind you create new object therefore you can not call removeEventListener with func name
}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li')
  newMovieElement.className = 'movie-element'
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 starts</p>
    </div>
  `
  newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id))
  const listRoot = document.getElementById('movie-list')
  listRoot.append(newMovieElement)
}

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible')
}

const showMovieModal = () => {
  addMovieModal.classList.add('visible')
  toggleBackdrop()
}

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible')
}

const backdropClickHandler = () => {
  closeMovieModal()
  closeMovieDeletionModal()
  clearMovieInputs()
}

const cancelAddMovie = () => {
  closeMovieModal()
  clearMovieInputs()
  toggleBackdrop()
}

const clearMovieInputs = () => {
  for (const inputs of userInputs) {
    inputs.value = ''
  }
}

const addMovieHandler = () => {
  const titleValue = userInputs[0].value
  const imageUrlValue = userInputs[1].value
  const ratingValue = userInputs[2].value

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue >5
    ) {
      alert('Please enter valid values')
      return
    }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  }

  movies.push(newMovie)
  console.log(movies)
  closeMovieModal()
  toggleBackdrop()
  clearMovieInputs()
  renderNewMovieElement(newMovie.id ,newMovie.title, newMovie.image, newMovie.rating)
  updateUI()
}

startAddMovieButton.addEventListener('click', showMovieModal)
backdrop.addEventListener('click', backdropClickHandler)
cancelAddMovieButton.addEventListener('click', cancelAddMovie)
confirmAddMovieButton.addEventListener('click', addMovieHandler)