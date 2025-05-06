import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { editUser, getUser } from '../../../services/api/admin'
import { useNavigate, useParams } from 'react-router-dom'

const EditUser = () => {
    const params = useParams()
    const [user, setUser] = useState({
        id: params.id,
        username: '',
        email: '',
        userType: '',
    })
    const navigate = useNavigate()

    useEffect(() => {
        getUser(params.id).then((data) => setUser(data))
    }, [params.id])

    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === 'userType') value = parseInt(value)
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editUser(user).then((data) => {
            if (typeof data === 'string') {
                alert('Edit user successfully')
                navigate('/admin')
            }
        })
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Create New User</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                value={user.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Select
                            name="userType"
                            value={user.userType}
                            onChange={handleChange}
                        >
                            <option value={0}>User</option>
                            <option value={1}>Admin</option>
                        </Form.Select>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            Edit user
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default EditUser
