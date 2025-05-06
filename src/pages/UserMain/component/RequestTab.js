import { Accordion, Badge, Button, Tab } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { getBookRequests } from '../../../services/api/user'
import reformDate from '../../../services/date/datetime'
import { useNavigate } from 'react-router-dom'

const RequestTab = () => {
    const [requests, setRequests] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getBookRequests().then((data) => setRequests(data))
    }, [])

    return (
        <Tab.Pane eventKey="requests">
            <h2>Book Requests</h2>
            <Accordion alwaysOpen>
                {requests.map((request) => (
                    <Accordion.Item key={request.id} eventKey={request.id}>
                        <Accordion.Header
                            className="d-flex justify-content-between"
                            style={{ backgroundColor: '#f8f9fa' }} // Change background color
                        >
                            <span>
                                {reformDate(request.requestedDate)} -{' '}
                                {request.books.length} books
                            </span>
                            <Badge
                                bg={
                                    ['success', 'danger', 'warning'][
                                        request.status
                                    ]
                                }
                            >
                                {
                                    ['Approved', 'Rejected', 'Waiting'][
                                        request.status
                                    ]
                                }
                            </Badge>
                        </Accordion.Header>
                        {request.books.map((book) => (
                            <Accordion.Body
                                key={book.id}
                                className="d-flex justify-content-between"
                            >
                                <span>
                                    {book.title} - Author: {book.author}
                                </span>{' '}
                                {request.status === 0 && <Button onClick={() => navigate(`/user/book/review/${book.id}`)}>Review</Button>}
                            </Accordion.Body>
                        ))}
                    </Accordion.Item>
                ))}
            </Accordion>
        </Tab.Pane>
    )
}

export default RequestTab
