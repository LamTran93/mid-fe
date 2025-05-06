import { useState } from 'react'
import { Button, Col, Form, Row, Tab, Table } from 'react-bootstrap'
import { deleteUser, getUsers, setAdmin } from '../../../services/api/admin'
import { useNavigate } from 'react-router-dom'

const UserTab = () => {
    const [users, setUsers] = useState([])
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const handleConfirmDelete = (user) => {
        if (window.confirm(`Delete ${user.username} ?`))
        {
            deleteUser(user.id)
            setUsers(prev => prev.filter(u => u.id !== user.id))
        }
    }

    const handleSetAdmin = (id) => {
        setAdmin(id).then(() => {
            setUsers((prev) => [
                ...prev.map((val) =>
                    val.id === id ? { ...val, userType: 1 } : val
                ),
            ])
        })
    }

    const handleSearch = () => {
        getUsers(keyword).then(data => setUsers(data))
    }

    return (
        <Tab.Pane eventKey="users">
            <h3>Users</h3>
            <Row className="mb-3">
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </Col>
                <Col>
                    <Button onClick={handleSearch}>Search</Button>
                </Col>
                <Col><Button onClick={() => navigate('/admin/user/create')}><i className="bi bi-person-fill-add"></i>Create new user</Button></Col>
                <Col></Col>
            </Row>

            {users.length > 0 && <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.userType === 0 ? 'User' : 'Admin'}</td>
                            <td>
                                <Button
                                    className="me-3"
                                    variant="success"
                                    onClick={() =>
                                        navigate(`/admin/user/edit/${user.id}`)
                                    }
                                >
                                    <i class="bi bi-pencil-square">Edit</i>
                                </Button>
                                <Button
                                    className="me-3"
                                    variant="danger"
                                    onClick={() => handleConfirmDelete(user)}
                                >
                                    <i class="bi bi-trash">Delete</i>
                                </Button>
                                <Button
                                    variant="warning"
                                    onClick={() => handleSetAdmin(user.id)}
                                >
                                    <i class="bi bi-person-up">Set Admin</i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>}
        </Tab.Pane>
    )
}

export default UserTab
