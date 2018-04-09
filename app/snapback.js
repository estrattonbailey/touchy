import Tweezer from 'tweezer.js'
import rosin from 'rosin'

function raf (cb) {
  return function event (e) {
    requestAnimationFrame(() => {
      cb(e)
    })
  }
}

export default function snapback (slider) {
  let width
  let index = 0
  let slidesCount = 0
  const track = document.createElement('div')
  let position = 0
  let delta = 0

  track.style.cssText = `
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
  `

  function clamp (i) {
    if (i > (slidesCount - 1)) {
      return 0
    } else if (i < 0) {
      return slidesCount - 1
    }

    return i
  }

  function mount () {
    for (let i = slider.children.length - 1; i > -1; i--) {
      const slide = slider.children[i]
      track.insertBefore(slide, track.children[0])
      slidesCount++
    }

    slider.appendChild(track)
  }

  function resize () {
    let offset = 0

    width = slider.clientWidth

    for (let i = 0; i < track.children.length; i++) {
      const slide = track.children[i]
      slide.style.transform = `translateX(${offset}px)`
      offset = offset + width
    }

    delta = 0
    position = index * width * -1
    track.style.transform = `translateX(-${position}px)`
    slider.style.height = track.children[index].clientHeight + 'px'
  }

  function select (i) {
    const start = position + delta
    const end = i * width * -1

    new Tweezer({
      start,
      end,
      duration: 500
    }).on('tick', val => {
      track.style.transform = `translateX(${val}px)`
    }).on('done', () => {
      index = i
      position = end
      delta = 0
    }).begin()
  }

  function whichByDistance (delta) {
    if (delta > (width / 2)) {
      select(clamp(--index))
    } else if (delta < ((width / 2) * -1)) {
      select(clamp(++index))
    } else {
      select(index)
    }
  }

  mount()
  resize()
  select(index)

  window.addEventListener('resize', raf(resize))

  const drag = rosin(slider)

  drag.on('drag', ({ x, y }) => {
    delta = x
    track.style.transform = `translateX(${position + delta}px)`
  })
  drag.on('mouseup', () => {
    whichByDistance(delta)
  })

  return {
    prev () {
      select(clamp(--index))
    },
    next () {
      select(clamp(++index))
    }
  }
}
