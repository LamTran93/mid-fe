import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getBook, getReviews } from '../../../services/api/user'

const BookReview = () => {
    const [book, setBook] = useState({})
    const [reviews, setReviews] = useState([])
    const params = useParams()

    useEffect(() => {
        getBook(params.bookId).then((data) => setBook(data))
        getReviews(params.bookId).then((data) => setReviews(data))
    }, [params.bookId])

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>
                        Book Reviews : {book.title} - Author: {book.author}
                    </h1>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {reviews.map((review, index) => (
                                    <ListGroup.Item key={review.id}>
                                        <h1>#{index+1} {review.user.username}</h1>
                                        <strong>Rating:</strong> {review.rating}{' '}
                                        / 5
                                        <br />
                                        <strong>Comment:</strong>{' '}
                                        {review.comment}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default BookReview
