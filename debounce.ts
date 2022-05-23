export const createDebouncer = <T extends any[]>(
  fx: (...args: T) => void,
  wait = 2000,
  immediate: boolean = false
) => {
  let timeout: NodeJS.Timeout | null = null

  // figure out a way to make this arg... the same
  return (...args: T) => {
    const later = () => {
      timeout = null
      if (!immediate) {
        fx.apply(null, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout as NodeJS.Timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      fx.apply(null, args)
    }
  }
}
