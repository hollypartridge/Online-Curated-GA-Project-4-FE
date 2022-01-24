import axios from 'axios'

const baseUrl = '/api'

export function getAllProducts() {
  return axios.get(`${baseUrl}/products/`)
}

export function getSingleProduct(productId) {
  return axios.get(`${baseUrl}/products/${productId}`)
}