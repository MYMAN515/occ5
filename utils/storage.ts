export const safeLocalStorage = {
  getItem(key: string) {
    if (typeof window === 'undefined') return null

    try {
      return window.localStorage.getItem(key)
    } catch (error) {
      console.warn('localStorage getItem failed', key, error)
      return null
    }
  },

  setItem(key: string, value: string) {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(key, value)
    } catch (error) {
      console.warn('localStorage setItem failed', key, error)
    }
  },

  removeItem(key: string) {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.warn('localStorage removeItem failed', key, error)
    }
  }
}
