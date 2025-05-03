export const ROOT_API = {
    baseURL: 'https://localhost:7279/',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const ENDPOINTS = {
    authentication: {
        login: "/api/authentication/login",
        refreshToken: "/api/authentication/refreshToken",
        register: "/api/authentication/register"
    },
    user: {
        books: "/api/user/books",
        categories: "/api/user/categories",
        filteredBooks: "/api/user/books/filter"
    }
}
