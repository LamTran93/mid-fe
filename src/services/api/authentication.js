import { ENDPOINTS } from "../axios/config"
import client from "../axios/httpClient"

export const login = ({username, password}) => {
    client.post(ENDPOINTS.login, {username, password})
        .then(res => console.log(res))
}

export const logout = () => {
    localStorage.removeItem("token")
    client.get(ENDPOINTS.logout)
}