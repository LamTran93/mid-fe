import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import '../css/Login.css'
import { useCallback, useState } from 'react'
import { login } from '../../../services/api/authentication'
import { useAuthContext } from '../../../context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({})
    const { setIsAuthenticated, setUserInfo } = useAuthContext()
    const navigate = useNavigate()

    const setLoginProperty = useCallback(
        (propertyName, value) => {
            setLoginInfo((prev) => {
                return { ...prev, [propertyName]: value }
            })
        },
        [setLoginInfo]
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await login(loginInfo)
        localStorage.setItem('token', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('userType', response.user.userType)
        setIsAuthenticated(true)
        setUserInfo(response.user)
        if (response.user.userType === 1) {
            navigate('/admin')
        } else {
            navigate('/user')
        }
    }

    return (
        <div className="login-page">
            <Container>
                <Row className="justify-content-center align-items-center vh-100">
                    <Col lg={4} md={6} sm={8}>
                        <Card className="shadow-lg">
                            <Card.Body>
                                <h3 className="text-center mb-4">
                                    Welcome Back
                                </h3>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your username"
                                            value={loginInfo.username}
                                            onChange={(e) =>
                                                setLoginProperty(
                                                    'username',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            value={loginInfo.password}
                                            onChange={(e) =>
                                                setLoginProperty(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 mt-3"
                                        onClick={handleSubmit}
                                    >
                                        Login
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
