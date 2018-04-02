export default function drag (context) {
  let x
  let y
  let focus = false
  let fns = []

  window.addEventListener('mousedown', e => {
    if (e.target === context || context.contains(e.target)) {
      focus = true
      x = e.clientX
      y = e.clientY
    }
  })

  window.addEventListener('mouseup', e => {
    if (focus) focus = false
  })

  window.addEventListener('mousemove', e => {
    focus && requestAnimationFrame(() => {
      for (let i = 0; i < fns.length; i++) fns[i]({
        x: e.clientX - x,
        y: e.clientY - y
      })
    })
  })

  return function handler (fn) {
    fns.indexOf(fn) < 0 && fns.push(fn)
    return () => fns.splice(fns.indexOf(fn), 1)
  }
}
