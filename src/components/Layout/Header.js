import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <Navbar expand="lg" bg="info">
            <Container>
                <Navbar.Brand as={Link} to='/home'>BookPort</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/quote/list?page=1'>List</Nav.Link>
                        <Nav.Link as={Link} to='/quote/create'>Create</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header