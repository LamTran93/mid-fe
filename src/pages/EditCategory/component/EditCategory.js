import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { editCategory, getCategory } from '../../../services/api/admin'

const EditCategory = () => {
    
    const params = useParams()
    const [category, setCategory] = useState({
        id: params.id,
        name: '',
    })
    const navigate = useNavigate()

    useEffect(()=>{
        getCategory(params.id).then(data => setCategory(data))
    },[params.id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setCategory({
            ...category,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editCategory(category).then(() => {
            alert("Edit category successfully")
            navigate("/admin")
        })
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Edit Category</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formCategoryId" className="mb-3">
                            <Form.Label>Category ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="id"
                                value={category.id}
                                required
                                disabled
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="formCategoryName"
                            className="mb-3"
                        >
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                name="name"
                                value={category.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default EditCategory
