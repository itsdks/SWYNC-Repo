import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';

const { format } = require("date-fns");

const BookingPage = () => {
    const {user} = useAuthContext()
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const navigation = useNavigate();

    const deleteHandler = async () => {
        if(!user){
            setError('You must be logged in')
            return
        }
        const response = await fetch('/api/bookings/' + id, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        });
        const json = await response.json();

        if(response.ok) {
            setError(null);
            navigation('/bookings');
        } else {
            setError(json.error);
        }
    }

    const swapHandler = async () => {
        if(!user){
            setError('You must be logged in')
            return
        }
        const response = await fetch('/api/bookings/' + id, {
            method: 'PATCH',
            headers: {'Authorization': `Bearer ${user.token}`}
        });
        const json = await response.json();

        if(response.ok){
            setError(null);
            navigation('/swap');
        } else {
            setError(json.error);
        }
    }

    useEffect(() => {

        const fetchBooking = async () => {
            const response = await fetch('/api/bookings/' + id, {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            console.log(json)

            if(response.ok){
                setBooking(json);
                setError(null);
            } else{
                setError(json.error);
            }
        }

        if(user){
            fetchBooking()
        }
    }, [user])

    return (
        <div className="booking-page">
            {booking && <article>
                <h2>{booking.pName}</h2>
                <p><strong>Age: </strong>{booking.pAge}</p>
                <p><strong>Gender: </strong>{booking.pGender}</p>
                <p><strong>Doctor: </strong>{booking.dName}</p>
                <p><strong>Date: </strong>{format(new Date(booking.slot), 'PPP')}</p>
                <p><strong>Time: </strong>{format(new Date(booking.slot), 'p')}</p>
                <p>Time of booking: {format(new Date(booking.createdAt), 'PPPp')}</p>
                <span className='material-symbols-outlined' onClick={deleteHandler}>delete</span>
                {!booking.readyToSwap && <button onClick={swapHandler}>Swap Booking</button>}
                {booking.readyToSwap && <p><strong>This slot is marked for swapping</strong></p>}
                {error && <div className='error'>{error}</div>}
            </article>}
        </div>
    );
}
 
export default BookingPage;