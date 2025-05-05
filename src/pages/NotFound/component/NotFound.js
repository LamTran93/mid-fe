import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <Container
            className="text-center"
            style={{ marginTop: '10%', color: '#6c757d' }}
        >
            <Row>
                <Col>
                    <h1>404</h1>
                    <h3>Page Not Found</h3>
                    <p>The page you are looking for does not exist.</p>
                    <Button variant="primary" onClick={() => navigate("/")}>
                        Go to Homepage
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound
