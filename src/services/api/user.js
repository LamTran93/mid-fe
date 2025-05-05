import { ENDPOINTS } from '../axios/config'
import client from '../axios/httpClient'

export const getBooks = async (_page, _perPage) => {
    let res = await client.get(ENDPOINTS.user.books, {
        params: { _page, _perPage },
    })
    return res.data
}

export const getCategories = async () => {
    let res = await client.get(ENDPOINTS.user.categories)
    return res.data
}

export const getFilteredBooks = async (params) => {
    let res = await client.get(ENDPOINTS.user.filteredBooks, {params})
    return res.data
}

export const postBookRequest = async (bookIds) => {
    await client.post(ENDPOINTS.user.requests, bookIds)
}

export const getBookRequests = async () => {
    let res = await client.get(ENDPOINTS.user.requests)
    return res.data
}