import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const Login = () => {
    return (
        <Container>
            <Row>
                <Col lg={4}></Col>
                <Col lg={4}>
                    <Card className='mt-5'>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className='mt-3'>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}></Col>
            </Row>
        </Container>
    )
}

export default Login
