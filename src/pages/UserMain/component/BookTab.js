import { useEffect, useState } from 'react'
import {
    getBooks,
    getCategories,
    getFilteredBooks,
    postBookRequest,
} from '../../../services/api/user'
import { Table, Form, Button, Pagination, Tab, Row, Col } from 'react-bootstrap'

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
    const [selectedBooks, setSelectedBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [filterMode, setFilterMode] = useState(false)
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

    const handleCheckboxChange = (bookId) => {
        setSelectedBooks((prev) =>
            prev.includes(bookId)
                ? prev.filter((id) => id !== bookId)
                : [...prev, bookId]
        )
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

    const handleRequestBooks = () => {
        postBookRequest(selectedBooks).then((data) => {
            if (data) alert('Send requests successfully!')
        })
    }

    const handleClear = () => {
        setSelectedBooks([])
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
                </Row>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Author</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>
                                <Form.Check
                                    type="checkbox"
                                    checked={selectedBooks.includes(book.id)}
                                    onChange={() =>
                                        handleCheckboxChange(book.id)
                                    }
                                    disabled={book.quantity === 0}
                                />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.description}</td>
                            <td>
                                {book.quantity}/{book.total}
                            </td>
                            <td>{book.category ? book.category.name : "No category"}</td>
                            <td>
                                {book.ratingAverage === 0
                                    ? 'No reviews'
                                    : book.ratingAverage}
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

            <Button
                className="me-5"
                variant="primary"
                onClick={handleRequestBooks}
                disabled={
                    selectedBooks.length === 0 || selectedBooks.length > 5
                }
            >
                Request Book
            </Button>
            <Button
                variant="primary"
                onClick={handleClear}
                disabled={selectedBooks.length === 0}
            >
                Clear
            </Button>

            {selectedBooks.length > 5 && (
                <div className="alert alert-danger">
                    You can only select up to 5 books.
                </div>
            )}
        </Tab.Pane>
    )
}

export default BookTab
