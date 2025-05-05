import React, { useEffect, useState } from 'react'
import { Tab, Accordion, Badge, Button } from 'react-bootstrap'
import reformDate from '../../../services/date/datetime'
import { approveRequest, getBookRequests, rejectRequest } from '../../../services/api/admin'

const RequestTab = () => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        getBookRequests().then((data) => setRequests(data))
    }, [])

    const handleApprove = (id) => {
        approveRequest(id).then(() => {
            getBookRequests().then((data) => setRequests(data))
        })
    }

    const handleReject = (id) => {
        rejectRequest(id).then(() => {
            getBookRequests().then((data) => setRequests(data))
        })
    }

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
                            <Accordion.Body key={book.id}>
                                {book.title} - Author: {book.author}
                            </Accordion.Body>
                        ))}
                        <Accordion.Body>
                            <Button
                                className="me-3"
                                onClick={() => handleApprove(request.id)}
                                disabled={request.status !==2}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleReject(request.id)}
                                disabled={request.status !==2}
                            >
                                Reject
                            </Button>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Tab.Pane>
    )
}

export default RequestTab
