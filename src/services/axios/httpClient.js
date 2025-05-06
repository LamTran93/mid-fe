import axios from 'axios'
import { ROOT_API } from './config'
import { refreshToken } from '../api/authentication'

const client = axios.create(ROOT_API)

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

client.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (err.status === 401) {
            try {
                const response = await refreshToken()
                let token = response.accessToken
                localStorage.setItem('token', token)
                err.config.headers['Authorization'] = `Bearer ${token}`
                return client(err.config)
            } catch (error) {
                return Promise.reject(error)
            }
        } else {
            console.log(err)
            alert(`Error: ${err.response.data.detail ?? JSON.stringify(err.response.data.errors) ?? 'Unknown error'}`)
            return { data: null }
        }
    }
)

export default client
