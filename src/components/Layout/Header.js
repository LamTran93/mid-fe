import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, setUserInfo } =
        useAuthContext()
    const navigate = useNavigate()

    const handleLogout = () => {
        setIsAuthenticated(false)
        setUserInfo({})
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        navigate('/login')
    }

    return (
        <Navbar expand="lg" bg="info" variant="dark" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    LibPort
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="text-white">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about" className="text-white">
                            About
                        </Nav.Link>
                        {isAuthenticated ? (
                            <Nav.Link
                                as={Link}
                                className="text-white"
                                onClick={handleLogout}
                            >
                                Log out
                            </Nav.Link>
                        ) : (
                            <Nav.Link
                                as={Link}
                                to="/login"
                                className="text-white"
                            >
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
