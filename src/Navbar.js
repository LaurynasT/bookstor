import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


function NavBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);  
    };


    return (
        <Navbar expand="lg" className="body-tertiary bg-primary rounded-bottom-3 border border-dark ">
            <Container>
                <Navbar.Brand as={Link} to="/" className='text'>BookStore</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/"  className='text'>Home</Nav.Link>
                        <Nav.Link as={Link} to="/Reservations"  className='text'>Reservations</Nav.Link>
                    </Nav>

                   
                    <Form className="d-flex">
                        <InputGroup>
                        <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className=""
                            />
                            <Button type="submit" variant="secondary" className="">
                                Search
                            </Button>
                        </InputGroup>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
