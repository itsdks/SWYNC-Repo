import { Link } from "react-router-dom";

const {format} = require("date-fns")

const BookingDetails = ({bookings}) => {
    return (
        <div className="doctor-list">
            {bookings.map(booking => (
                <div className="doctor-details" key={booking._id}>
                    <Link to={`/bookings/${booking._id}`}>
                        <h4>{booking.pName}</h4>
                        <p><strong>Doctor: </strong>{booking.dName}</p>
                        <p><strong>Date: </strong>{format(new Date(booking.slot), 'PPP')}</p>
                        <p><strong>Time: </strong>{format(new Date(booking.slot), 'p')}</p>
                    </Link>
                </div>  
            ))}
        </div>
    );
}
 
export default BookingDetails;