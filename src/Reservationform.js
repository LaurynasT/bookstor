import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';



export default function Reservatioform() { 
    const { id } = useParams();
    console.log(id);
    const [days, setDays] = useState(1);
    const [quickPickup, setQuickPickup] = useState(false);
    const [totalCost, setTotalCost] = useState(null); 
    const [type, setType] = useState("Book"); 
    const [book, setBooks] = useState(null);


    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5227/api/Books/books/${id}`);
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        fetchBookDetails();
    }, [id]);

    const reserveBook = async (event) => {
        event.preventDefault();
        const reservation = { BookId: parseInt(id, 10), days, quickPickup, type };
        console.log("Sending reservation request:", reservation);
        
        try {
            const response = await axios.post('http://localhost:5227/api/Books/reserve', reservation);
            console.log("Reservation Data:", response.data);
            setTotalCost(response.data.totalCost); 
        } catch (error) {
            console.error("Error making reservation:", error.response ? error.response.data : error.message);
            alert("Failed to make reservation.");
        }
    };
    

    return (
        
            
        <Container className="rounded bg-lightgrey mt-5">
        {book ? ( 
            <>
                <h2 className="text-center mb-4">Reserve Book: {book.name}</h2>
                <Form onSubmit={reserveBook}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formDays">
                            <Form.Label>Days</Form.Label>
                            <Form.Control
                                type=""
                                min="1"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formType">
                            <Form.Label>Book Type</Form.Label>
                            <Form.Select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="Book">Book</option>
                                <option value="Audiobook">Audiobook</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group controlId="formQuickPickup" className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Quick Pickup"
                            checked={quickPickup}
                            onChange={() => setQuickPickup(!quickPickup)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Reserve
                    </Button>
                </Form>

                {totalCost !== null && ( 
                    <div className="mt-3">
                        <strong className = "text">Reservation Details</strong> <br />
                        <strong>Book Name:</strong> {book.name} <br />
                        <strong>Days Reserved:</strong> {days} <br />
                        <strong>Quick Pickup:</strong> {quickPickup ? 'Yes' : 'No'} <br />
                        <strong>Type</strong> {type} <br />
                        <strong>Total Cost:</strong> €{totalCost}
                    </div>
                )}
            </>
        ) : (
            <h2 className="text-center mb-4">Hi</h2> 
        )}
    </Container>
);
   
}
