import {useEffect, useState} from 'react'
import BookingDetails from '../components/BookingDetails'
import { useAuthContext } from '../hooks/useAuthContext'

const Booking = () => {
    const [bookings, setBookings] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await fetch('/api/bookings', {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()

            if(response.ok){
                setBookings(json)
            } else{
                console.log('not fetched')
            }
        }

        if(user){
            fetchBookings()
        }
    }, [user])



    return (
        <div className="bookings">
            <h2>Bookings</h2>
            {bookings && <BookingDetails bookings={bookings}/>}
        </div>
    );
}
 
export default Booking;