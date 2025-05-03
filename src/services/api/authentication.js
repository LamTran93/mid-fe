import { ENDPOINTS } from '../axios/config'
import client from '../axios/httpClient'

export const login = async ({ username, password }) => {
    var res = await client.post(ENDPOINTS.authentication.login, {
        username,
        password,
    })
    return res.data
}

export const refreshToken = async () => {
    var res = await client.post(ENDPOINTS.authentication.refreshToken, {
        refreshToken: localStorage.getItem('refreshToken'),
    })
    return res.data
}
