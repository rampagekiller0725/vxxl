import axios from 'axios'

// api base url
export const API_BASE_URL = 'https://back.vxxl.org'

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    mode: 'no-cors',
  }
})


export default instance
