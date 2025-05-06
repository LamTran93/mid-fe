import { ENDPOINTS } from '../axios/config'
import client from '../axios/httpClient'

export const getBooks = async (_page, _perPage) => {
    let res = await client.get(ENDPOINTS.admin.books, {
        params: { _page, _perPage },
    })
    return res.data
}

export const getCategories = async () => {
    let res = await client.get(ENDPOINTS.admin.categories)
    return res.data
}

export const getFilteredBooks = async (params) => {
    let res = await client.get(ENDPOINTS.admin.filteredBooks, { params })
    return res.data
}

export const postBookRequest = async (bookIds) => {
    await client.post(ENDPOINTS.admin.requests, bookIds)
}

export const getBookRequests = async () => {
    let res = await client.get(ENDPOINTS.admin.requests)
    return res.data
}

export const deleteBook = async (id) => {
    await client.delete(`${ENDPOINTS.admin.books}/${id}`)
}

export const getBook = async (id) => {
    let res = await client.get(`${ENDPOINTS.admin.books}/${id}`)
    return res.data
}

export const editBook = async (book) => {
    await client.put(`${ENDPOINTS.admin.books}/${book.id}`, book)
}

export const deleteCategory = async (id) => {
    await client.delete(`${ENDPOINTS.admin.categories}/${id}`)
}

export const getCategory = async (id) => {
    let res = await client.get(`${ENDPOINTS.admin.categories}/${id}`)
    return res.data
}

export const createCategory = async (category) => {
    await client.post(ENDPOINTS.admin.categories, category)
}

export const editCategory = async (category) => {
    await client.put(`${ENDPOINTS.admin.categories}/${category.id}`, category)
}

export const createBook = async (book) => {
    await client.post(ENDPOINTS.admin.books, book)
}

export const approveRequest = async (id) => {
    await client.put(ENDPOINTS.admin.approveRequest.replace('{id}', id))
}

export const rejectRequest = async (id) => {
    await client.put(ENDPOINTS.admin.rejectRequest.replace('{id}', id))
}

export const getUsers = async (keyword) => {
    let res = await client.get(ENDPOINTS.admin.users, { params: { keyword } })
    return res.data
}

export const setAdmin = async (id) => {
    await client.put(
        ENDPOINTS.admin.userRole.replace('{id}', id),
        {},
        {
            params: { type: 1 },
        }
    )
}

export const deleteUser = async (id) => {
    await client.delete(`${ENDPOINTS.admin.users}/${id}`)
}

export const editUser = async (user) => {
    let res = await client.put(`${ENDPOINTS.admin.users}/${user.id}`, user)
    return res.data
}

export const createUser = async (user) => {
    let res = await client.post(ENDPOINTS.admin.users, user)
    return res.data
}

export const getUser = async (id) => {
    let res = await client.get(`${ENDPOINTS.admin.users}/${id}`)
    return res.data
}
