import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const Home = () => {
    return (
        <Container className="mt-5">
            <Row className="text-center mb-4">
                <Col>
                    <h1>Welcome to LibPort</h1>
                    <p>Your one-stop portal for all your library needs!</p>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Search Books</Card.Title>
                            <Card.Text>
                                Explore our vast collection of books and find
                                your next read.
                            </Card.Text>
                            <Button variant="primary">Search Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Library Events</Card.Title>
                            <Card.Text>
                                Stay updated with the latest events happening at
                                the library.
                            </Card.Text>
                            <Button variant="primary">View Events</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Membership</Card.Title>
                            <Card.Text>
                                Become a member to enjoy exclusive benefits and
                                services.
                            </Card.Text>
                            <Button variant="primary">Join Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
