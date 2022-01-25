import axios from 'axios'

const baseUrl = '/api'

// * Product requests

export function getAllProducts() {
  return axios.get(`${baseUrl}/products/`)
}

export function getSingleProduct(productId) {
  return axios.get(`${baseUrl}/products/${productId}`)
}

// * Auth Requests

export function registerUser(formData) {
  return axios.post(`${baseUrl}/register/`, formData)
}