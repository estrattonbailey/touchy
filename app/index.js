import snapback from 'snapback'

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

slider.on('select', index => {
  console.log('select', index)
})
slider.on('settle', index => {
  console.log('settle', index)
})
