import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-3">
            <Container>
                <Row>
                    <Col md={6} className="text-center text-md-start">
                        <p className="mb-0">&copy; Lam Tran 2025</p>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <a
                            href="#"
                            className="text-white text-decoration-none mx-2"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-white text-decoration-none mx-2"
                        >
                            Terms of Service
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
