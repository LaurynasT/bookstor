import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import BookList from './BookList';
import Reservationform from './Reservationform';
import Reservations from './Reservations';
import axios from 'axios';

export default function App() {
    const [search, setSearch] = useState("");
    

    const fetchBooks = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5227/api/Books/books?search=${search}`);
            return response.data || [];
        } catch (error) {
            console.error("Error fetching books:", error);
            return [];
        }
    }, [search]);

    const handleSearch = (query) => {
        setSearch(query);
        fetchBooks();
    };

    
    return (
        <Router>
            <Navbar onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<BookList fetchBooks={fetchBooks} />} />
                <Route path="/reserve/:id" element={<Reservationform />} />
                <Route path="/Reservations" element={<Reservations />} />
            </Routes>
        </Router>
    );
}
