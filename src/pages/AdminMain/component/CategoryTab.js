import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Tab, Form } from 'react-bootstrap'
import {
    createCategory,
    deleteCategory,
    getCategories,
} from '../../../services/api/admin'
import { useNavigate } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications'

const CategoryTab = () => {
    const [categories, setCategories] = useState([])
    const [addedCategory, setAddedCategory] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then((data) => setCategories(data))
    }, [])

    const handleConfirmDelete = (category) => {
        if (window.confirm(`Delete category ${category.name} ?`)) {
            deleteCategory(category.id).then(() => {
                getCategories().then((data) => setCategories(data))
            })
        }
    }

    const handleCreateCategory = () => {
        createCategory({ name: addedCategory }).then(() => {
            getCategories().then((data) => setCategories(data))
        })
    }

    return (
        <Tab.Pane eventKey="categories">
            <h1 className="text-center mb-4">Book Categories</h1>
            <Row>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Category name"
                        value={addedCategory}
                        onChange={(e) => setAddedCategory(e.target.value)}
                    />
                </Col>
                <Col>
                    <Button
                        variant="success"
                        className="mb-4"
                        onClick={handleCreateCategory}
                        disabled={!addedCategory}
                    >
                        <i class="bi bi-bookmark-plus">Create category</i>
                    </Button>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                {categories.map((category) => (
                    <Col key={category.id} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{category.name}</Card.Title>
                                <Button
                                    className="me-3"
                                    variant="primary"
                                    onClick={() =>
                                        navigate(
                                            `/admin/category/edit/${category.id}`
                                        )
                                    }
                                >
                                    <i class="bi bi-pencil-square">Edit</i>
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        handleConfirmDelete(category)
                                    }
                                >
                                    <i class="bi bi-trash">Delete</i>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Tab.Pane>
    )
}

export default CategoryTab
