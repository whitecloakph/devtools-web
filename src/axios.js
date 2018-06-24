import axios from 'axios'
import CONFIG from './config'

const INSTANCE = axios.create({
  baseURL: CONFIG.host,
})

export default INSTANCE
