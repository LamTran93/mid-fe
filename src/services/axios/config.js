export const ROOT_API = {
    baseUrl: 'https://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const ENDPOINTS = {
    authentication: {
        login: "authentication/login",
        logout: "authentication/logout",
        refreshToken: "authentication/refresh"
    }
}
