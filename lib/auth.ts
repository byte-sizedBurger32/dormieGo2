export const AUTH_STORAGE_KEY = "dormiego_authenticated"
export const ONBOARDING_STORAGE_KEY = "dormiego_onboarding_seen"
export const AUTH_CHANGE_EVENT = "dormiego:auth-change"

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false
  }
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true"
}

export const setAuthenticated = (value: boolean) => {
  if (typeof window === "undefined") {
    return
  }
  if (value) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true")
  } else {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: { isAuthenticated: value } }))
}
