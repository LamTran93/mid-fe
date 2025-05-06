import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { getBook, sendReview } from '../../../services/api/user'

const UserReview = () => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [book, setBook] = useState({})
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getBook(params.bookId).then((data) => setBook(data))
    }, [params.bookId])

    const handleSubmit = (e) => {
        e.preventDefault()
        sendReview({ rating, comment, bookId: book.id }).then(() => {
            alert('Review sent successfully')
            navigate('/user')
        })
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center">
                        Book Review - {book.title} - {book.author}
                    </h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="rating">
                            <Form.Label>Rating (1-5)</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                placeholder="Enter your rating"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="comment" className="mt-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your comment here"
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            Submit Review
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default UserReview
