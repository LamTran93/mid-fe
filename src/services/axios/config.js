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
        filteredBooks: "/api/user/books/filter",
        requests: "/api/user/requests"
    },
    admin: {
        books: "/api/admin/books",
        categories: "/api/admin/categories",
        filteredBooks: "/api/admin/books/filter",
        requests: "/api/admin/borrowing-requests",
        approveRequest: "/api/admin/borrowing-requests/{id}/approve",
        rejectRequest: "/api/admin/borrowing-requests/{id}/reject"
    }
}
