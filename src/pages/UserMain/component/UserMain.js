import React from 'react'
import {
    Container,
    Row,
    Col,
    Nav,
    Tab,
} from 'react-bootstrap'
import BookTab from './BookTab'
import RequestTab from './RequestTab'


const UserMain = () => {
    
    return (
        <Container fluid className="vh-100">
            <Tab.Container id="left-tabs-example" defaultActiveKey="books">
                <Row>
                    <Col sm={3} className="bg-light p-3 vh-100">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className="mb-2">
                                <Nav.Link
                                    eventKey="books"
                                    className="text-center"
                                >
                                    <strong>Books</strong>
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
                    <Col sm={9} className="vh-100">
                        <Tab.Content>
                            <BookTab />
                            <RequestTab />
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

export default UserMain
