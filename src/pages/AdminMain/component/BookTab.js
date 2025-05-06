import { useEffect, useState } from 'react'
import {
    deleteBook,
    getBooks,
    getCategories,
    getFilteredBooks,
} from '../../../services/api/admin'
import { Table, Form, Button, Pagination, Tab, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BookTab = () => {
    const [books, setBooks] = useState([])
    const [pagination, setPagination] = useState({
        first: 0,
        last: 0,
        current: 1,
    })
    const [filters, setFilters] = useState({
        title: '',
        author: '',
        isAvailable: '',
        minimumRating: '',
        categoryId: '',
    })
    const [categories, setCategories] = useState([])
    const [filterMode, setFilterMode] = useState(false)
    const navigate = useNavigate()
    const booksPerPage = 10

    useEffect(() => {
        getBooks(pagination.current, booksPerPage).then((data) => {
            setBooks(data.items)
            setPagination({
                first: data.first,
                last: data.last,
                current: data.current,
            })
        })
        getCategories().then((data) => setCategories(data))
    }, [])

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters({ ...filters, [name]: value })
    }

    const moveToPage = (page) => {
        if (filterMode) {
            getFilteredBooks({
                ...filters,
                _page: page,
                _perPage: booksPerPage,
            }).then((data) => {
                setBooks(data.items)
                setPagination({
                    first: data.first,
                    last: data.last,
                    current: data.current,
                })
            })
        } else {
            getBooks(page, booksPerPage).then((data) => {
                setBooks(data.items)
                setPagination((prev) => {
                    return {
                        ...prev,
                        current: data.current,
                    }
                })
            })
        }
    }

    const handleFilter = () => {
        getFilteredBooks(filters).then((data) => {
            setBooks(data.items)
            setPagination({
                first: data.first,
                last: data.last,
                current: data.current,
            })
            setFilterMode(true)
        })
    }

    const handleReset = () => {
        getBooks(pagination.current, booksPerPage).then((data) => {
            setBooks(data.items)
            setPagination({
                first: data.first,
                last: data.last,
                current: data.current,
            })
            setFilterMode(false)
        })
    }

    const handleConfirmDelete = (book) => {
        if (window.confirm(`Delete book ${book.title} ?`))
            deleteBook(book.id).then((data) => handleReset())
    }

    return (
        <Tab.Pane eventKey="books">
            <h2>Books</h2>
            <Form className="mb-3">
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Filter by title"
                            name="title"
                            value={filters.title}
                            onChange={handleFilterChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Filter by author"
                            name="author"
                            value={filters.author}
                            onChange={handleFilterChange}
                        />
                    </Col>
                    <Col>
                        <Form.Select
                            name="isAvailable"
                            value={filters.isAvailable}
                            onChange={handleFilterChange}
                        >
                            <option value="">Availability</option>
                            <option value="true">Available</option>
                            <option value="false">Unavailable</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Control
                            type="number"
                            placeholder="Minimum rating"
                            name="rating"
                            value={filters.rating}
                            onChange={handleFilterChange}
                        />
                    </Col>
                    <Col>
                        <Form.Select
                            name="categoryId"
                            value={filters.categoryId}
                            onChange={handleFilterChange}
                        >
                            <option value="">Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            onClick={handleFilter}
                            className="me-3"
                        >
                            Filter
                        </Button>
                        <Button variant="primary" onClick={handleReset}>
                            Reset
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/admin/book/create')}
                        >
                            <i className="bi bi-book">Create book</i>
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.description}</td>
                            <td>
                                {book.quantity}/{book.total}
                            </td>
                            <td>
                                {book.category
                                    ? book.category.name
                                    : 'No category'}
                            </td>
                            <td>
                                {book.ratingAverage === 0
                                    ? 'No reviews'
                                    : book.ratingAverage}
                            </td>
                            <td>
                                <Button
                                    className="mb-3"
                                    variant="success"
                                    onClick={() =>
                                        navigate(`/admin/book/edit/${book.id}`)
                                    }
                                >
                                    <i className="bi bi-pencil-square">Edit</i>
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleConfirmDelete(book)}
                                >
                                    <i className="bi bi-trash">Delete</i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                <Pagination.First onClick={() => moveToPage(1)} />
                <Pagination.Item
                    active={pagination.current === 1}
                    onClick={() =>
                        moveToPage(
                            pagination.current === 1 || pagination.current === 2
                                ? 1
                                : pagination.current === pagination.last
                                ? pagination.last - 2
                                : pagination.current - 1
                        )
                    }
                >
                    {pagination.current === 1 || pagination.current === 2
                        ? 1
                        : pagination.current === pagination.last
                        ? pagination.last - 2
                        : pagination.current - 1}
                </Pagination.Item>
                <Pagination.Item
                    active={
                        (pagination.current !== 1 &&
                            pagination.current !== pagination.last) ||
                        pagination.current === 2
                    }
                    hidden={pagination.last < 2}
                    onClick={() =>
                        moveToPage(
                            pagination.current === 1 || pagination.current === 2
                                ? 2
                                : pagination.current === pagination.last
                                ? pagination.last - 1
                                : pagination.current
                        )
                    }
                >
                    {pagination.current === 1 || pagination.current === 2
                        ? 2
                        : pagination.current === pagination.last
                        ? pagination.last - 1
                        : pagination.current}
                </Pagination.Item>
                <Pagination.Item
                    active={
                        pagination.current === pagination.last &&
                        pagination.current !== 1
                    }
                    hidden={pagination.last < 3}
                    onClick={() =>
                        moveToPage(
                            pagination.current === 1
                                ? 3
                                : pagination.current === pagination.last
                                ? pagination.last
                                : pagination.current + 1
                        )
                    }
                >
                    {pagination.current === 1
                        ? 3
                        : pagination.current === pagination.last
                        ? pagination.last
                        : pagination.current + 1}
                </Pagination.Item>
                <Pagination.Last onClick={() => moveToPage(pagination.last)} />
            </Pagination>
        </Tab.Pane>
    )
}

export default BookTab
