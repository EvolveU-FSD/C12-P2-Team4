// import axios from "axios"
// import { jwtDecode } from "jwt-decode"

// const API = axios.create()

// API.defaults.baseURL = "http://localhost:5173/"

// export function setAuthToken(token) {
//   if (token) {
//     API.defaults.headers.common["Authorization"] = `Bearer ${token}`
//   } else {
//     delete API.defaults.headers.common["Authorization"]
//   }
// }

// export function decodeToken(token) {
//   return jwtDecode(token)
// }

export default API
