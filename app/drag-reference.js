const obj = document.getElementById('object')
const target = document.getElementById('target')

let bounds
let xd = 0
let yd = 0
let touching = false
let position = null

document.addEventListener('mousedown', e => {
  if (e.target === obj || obj.contains(e.target)) {
    if (!position) {
      b = obj.getBoundingClientRect()
      position = {
        prevX: xd,
        prevY: yd,
        x: b.left + ((b.right - b.left) / 2),
        y: b.top + ((b.bottom - b.top) / 2)
      }
    }
    touching = true
  }
})
document.addEventListener('mouseup', e => {
  if (touching) {
    position = {
      prevX: position.prevX + xd,
      prevY: position.prevY + yd,
      x: position.x + xd,
      y: position.y + yd
    }
    
    touching = false
  }
})

document.addEventListener('mousemove', e => {
  touching && move(obj, bounds, e)
})

function move(o, b, e) {
  const { clientY: y, clientX: x } = e
  
  xd = (x - position.x) + position.prevX
  yd = (y - position.y) + position.prevY
  
  o.style.transform = `translateX(${xd}px) translateY(${yd}px)`
}
