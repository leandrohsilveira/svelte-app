import { navigate, RouteState, state } from './store'

export function link(node: HTMLElement) {
  function onClick(e: Event) {
    const anchor: any = e.currentTarget
    if (anchor.target === '') {
      e.preventDefault()
      const href = anchor.pathname + anchor.search
      const replace = anchor.hasAttribute('data-replace')
      navigate(href, { replace })
    }
  }

  node.addEventListener('click', onClick)

  return {
    destroy() {
      node.removeEventListener('click', onClick)
    },
  }
}

export function active(node: HTMLElement) {
  let currentRoute: RouteState
  const destroy = state.subscribe((route) => {
    currentRoute = route
    update()
  })

  function update() {
    let when = node.getAttribute('data-when')
    let clazz = node.getAttribute('data-active') ?? 'active'
    let exact = node.hasAttribute('data-exact')
    const match = currentRoute.match(when)
    if (typeof match === 'object' && (!exact || match.score === 0)) {
      if (!node.classList.contains(clazz)) node.classList.add(clazz)
    } else {
      if (node.classList.contains(clazz)) node.classList.remove(clazz)
    }
  }

  return {
    update,
    destroy,
  }
}
