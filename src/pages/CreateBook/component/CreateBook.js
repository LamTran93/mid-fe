import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { createBook, getCategories } from '../../../services/api/admin'

const CreateBook = () => {
    const [book, setBook] = useState({
        title: '',
        description: '',
        author: '',
        quantity: 0,
        total: 0,
        category: { id: '', name: '' },
    })
    const [error, setError] = useState({ message: '', show: false })
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then((data) => setCategories(data))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setBook({
            ...book,
            [name]: value,
        })
    }

    const getError = () => {
        let message = ''
        if (!book.title) message = "Title field can't be empty"
        if (!book.description) message = "Description field can't be empty"
        if (!book.author) message = "Author field can't be empty"
        if (book.quantity < 0) message = 'Quantity need to be possitive'
        if (book.total <= 0) message = 'Total books need to be more than 0'
        if (book.total < book.quantity)
            message = 'Total books need to be larger than book quantity'
        if (!book.category) message = 'Choose a category'
        if (message) return message
        else return false
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let error = getError()
        if (error) setError({ message: error, show: true })
        else {
            setError({ message: '', show: false })
            createBook(book).then((data) => {
                if (data) {
                    alert('Create new book successfully')
                    navigate('/admin')
                }
            })
        }
    }

    return (
        <Container className="mt-5">
            <h1>Create Book</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={book.title}
                                onChange={handleChange}
                                placeholder="Enter book title"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                value={book.author}
                                onChange={handleChange}
                                placeholder="Enter author name"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={book.description}
                        onChange={handleChange}
                        placeholder="Enter book description"
                    />
                </Form.Group>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={book.quantity}
                                onChange={handleChange}
                                placeholder="Enter quantity"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formTotal">
                            <Form.Label>Total</Form.Label>
                            <Form.Control
                                type="number"
                                name="total"
                                value={book.total}
                                onChange={handleChange}
                                placeholder="Enter total"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Select
                    name="categoryId"
                    value={book.category.id}
                    onChange={handleChange}
                >
                    <option value="">Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Form.Select>
                <Button variant="primary" type="submit" className="mt-3">
                    Save Changes
                </Button>
                <p className="text-danger mt-3" hidden={!error.show}>
                    {error.message}
                </p>
            </Form>
        </Container>
    )
}

export default CreateBook
