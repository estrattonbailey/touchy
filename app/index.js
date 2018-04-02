import snapback from './snapback.js'

/**
 * Enable hot reloading for all subsequent modules
 */
if (module.hot && process && process.env.NODE_ENV !== 'production') {
  module.hot.accept()
}

/**
 * Other app code goes below
 */

const slider = snapback(document.getElementById('slider'))

document.getElementById('prev').addEventListener('click', e => {
  slider.prev()
})
document.getElementById('next').addEventListener('click', e => {
  slider.next()
})
