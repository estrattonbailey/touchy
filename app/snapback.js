import Tweezer from 'tweezer.js'
import drag from './drag.js'

function raf (cb) {
  return function event (e) {
    requestAnimationFrame(() => {
      cb(e)
    })
  }
}

function clamp (i, max, min) {
  if (i > max) {
    return min
  } else if (i < min) {
    return max
  }

  return i
}

export default function snapback (slider) {
  let width
  let prevIndex = 0
  let index = 0
  let slidesCount = 0
  const track = document.createElement('div')

  track.style.cssText = `
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
  `

  function mount () {
    for (let i = slider.children.length - 1; i > -1; i--) {
      const slide = slider.children[i]
      track.insertBefore(slide, track.children[0])
      slidesCount++
    }

    slider.appendChild(track)
  }

  function position () {
    let offset = 0

    width = slider.clientWidth

    for (let i = 0; i < track.children.length; i++) {
      const slide = track.children[i]
      slide.style.transform = `translateX(${offset}px)`
      offset = offset + width
    }

    track.style.transform = `translateX(-${index * width}px)`
    slider.style.height = track.children[index].clientHeight + 'px'
  }

  function select (index) {
    if (prevIndex !== index) {
      new Tweezer({
        start: prevIndex * width,
        end: index * width
      }).on('tick', val => {
        track.style.transform = `translateX(-${val}px)`
      }).begin()
    }
  }

  mount()
  position()
  select(index)

  window.addEventListener('resize', raf(position))

  drag(slider)(({ x, y }) => {
    console.log(x, y)
  })

  return {
    prev () {
      prevIndex = index
      index = clamp(--index, slidesCount - 1, 0)
      select(index)
    },
    next () {
      prevIndex = index
      index = clamp(++index, slidesCount - 1, 0)
      select(index)
    }
  }
}
