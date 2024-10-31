import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';



const BookList = ({ fetchBooks }) => {
    const [books, setBooks] = useState([]);
    

    const fetchBooksData = useCallback(async () => {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
    }, [fetchBooks]);

    useEffect(() => {
        fetchBooksData();
    }, [fetchBooksData]);

    const navigate = useNavigate();
    const goToAddReservation = (id) => {
        navigate(`/reserve/${id}`);
    };

    return (
        <Container className="my-4">
            <Row>
                {books.length > 0 ? (
                    books.map((book) => (
                        <Col key={book.id} md={4} className="mb-4">
                            <Card className="h-100 shadow-sm ">
                                <Card.Img variant="top" src={book.imageUrl} className="img-fluid" style={{ height: '500px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title style={{ height: '25px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{book.name}</Card.Title>
                                    <Card.Text>
                                        Year: {book.year}
                                    </Card.Text>
                                    <Button 
                                        onClick={() => goToAddReservation(book.id)} 
                                        className="w-100 btn-primary">
                                        Reserve
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No books found.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default BookList;
