import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Reservations() {
    const [reservations, setReservations] = useState([]); 
    

    const fetchReservations = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5227/api/Books/reservations`);
            if (!response.ok) {
                const errorText = await response.text(); 
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }
            const data = await response.json();
            setReservations(data || []); 
        } catch (error) {
            console.error("Error fetching reservations:", error);
            setReservations([]); 
        }
    }, []);
    

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    return (
   
    
    <Container fluid className="d-flex justify-content-center align-items-center " style={{ minHeight: '10vh' }}>
        
        <Table striped bordered responsive className='mt-4  text-center border border-dark' size='xl'>
            <thead> 
            <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Days Reserved</th>
                <th>Quick Pickup</th>
                <th>Type</th>
                <th>Price, € </th>
            </tr>
            </thead>
            <tbody>
                {reservations.length > 0 ? (
                reservations.map((reservation, index) => (
                <tr key={reservation.id}  >
                <td>{index + 1}</td>
                <td>{reservation.books.name}</td>
                <td>{reservation.days}</td>
                <td>{reservation.quickPickup ? 'Yes' : 'No'}</td>
                <td>{reservation.type}</td>
                <td>{reservation.totalCost}€</td>
            </tr>
           ))
           ) : (
                <tr>
                <td colSpan={6} className="text-center">No reservations found.</td>
                </tr>
            )}
                </tbody>
    </Table>
    </Container>
    );
}