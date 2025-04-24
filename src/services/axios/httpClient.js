import { ROOT_API } from './config'

const client = axios.create(ROOT_API)

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

client.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {}
)

export default client
