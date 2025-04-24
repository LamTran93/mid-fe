import { Container, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <Navbar expand="lg" bg="info">
            <Container>
                <Navbar.Brand as={Link} to='/home'>BookPort</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header