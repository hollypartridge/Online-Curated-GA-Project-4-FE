const tokenName = 'token'

export function setToken(token) {
  window.localStorage.setItem(tokenName, token)
}