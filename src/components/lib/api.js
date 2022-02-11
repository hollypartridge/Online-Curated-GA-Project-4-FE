import axios from 'axios'

import { getToken, getUserId } from './auth'
import { baseUrl } from '../../config'

export function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * Product requests

export function getAllProducts() {
  return axios.get(`${baseUrl}/products/`)
}

export function getSingleProduct(productId) {
  return axios.get(`${baseUrl}/products/${productId}/`)
}

// * Wishlist Requests

export function addToWishlist(productId, productInteractionInfo) {
  return axios.post(`${baseUrl}/products/${productId}/wishlist/`, productInteractionInfo, headers())
}

export function removeFromWishlistShow(productId, wishlistId) {
  return axios.delete(`${baseUrl}/products/${productId}/wishlist/${wishlistId}/`, headers())
}

export function removeFromWishlist(productId, e) {
  return axios.delete(`${baseUrl}/products/${productId}/wishlist/${e.target.id}/`, headers())
}

// * Shopping Bag Requests

export function addToShoppingBag(productId, productInteractionInfo) {
  return axios.post(`${baseUrl}/products/${productId}/shoppingbag/`, productInteractionInfo, headers())
}

export function removeFromShoppingBag(productId, e) {
  return axios.delete(`${baseUrl}/products/${productId}/shoppingbag/${e.target.id}/`, headers())
}

export function removeAllFromShoppingBag(product) {
  return axios.delete(`${baseUrl}/products/${product.product.id}/shoppingbag/${product.id}/`, headers())
}

// * Wardrobe Requests

export function addToWardrobe(productId, productInteractionInfo) {
  return axios.post(`${baseUrl}/products/${productId}/wardrobe/`, productInteractionInfo, headers())
}

export function removeFromWardrobe(productId, e) {
  return axios.delete(`${baseUrl}/products/${productId}/wardrobe/${e.target.id}/`, headers())
}

// * Auth Requests

export function registerUser(formData) {
  return axios.post(`${baseUrl}/register/`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/login/`, formData)
}

// * User Requests

export function getUserProfile() {
  return axios.get(`${baseUrl}/profile/${getUserId()}/`)
}