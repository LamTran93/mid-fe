import React from 'react'
import {
    Container,
    Row,
    Col,
    Nav,
    Tab,
} from 'react-bootstrap'
import BookTab from './BookTab'
import CategoryTab from './CategoryTab'
import RequestTab from './RequestTab'


const AdminMain = () => {
    
    return (
        <Container fluid>
            <Tab.Container id="left-tabs-example" defaultActiveKey="books">
                <Row>
                    <Col sm={3} className="bg-light p-3" style={{ minHeight: '1000px' }}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className="mb-2">
                                <Nav.Link
                                    eventKey="books"
                                    className="text-center"
                                >
                                    <strong>Books</strong>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link
                                    eventKey="categories"
                                    className="text-center"
                                >
                                    <strong>Categories</strong>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="requests"
                                    className="text-center"
                                >
                                    <strong>Requests</strong>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9} style={{ minHeight: '1000px' }}>
                        <Tab.Content>
                            <BookTab />
                            <CategoryTab />
                            <RequestTab />
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

export default AdminMain
