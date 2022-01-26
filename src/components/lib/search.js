const searchName = 'search'

export function setSearchValueLocalStorage(searchValue) {
  window.localStorage.setItem(searchName, searchValue)
}

export function getSearchValueLocalStorage() {
  return window.localStorage.getItem(searchName)
}

export function removeSearchValueLocalStorage() {
  return window.localStorage.removeItem(searchName)
}