import { useNavigate, Link } from "react-router-dom";
import {useState} from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

const {format} = require("date-fns")

const SwapDetails = ({swap}) => {
    const {user} = useAuthContext()
    const [error, setError] = useState(null);
    const navigation = useNavigate();

    const cancelHandler = async () => {
        if(!user){
            setError('You must be logged in')
            return
        }
        const response = await fetch('/api/swap/' + swap._id, {
            method: 'PATCH',
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

    return (
        <div className="doctor-details">
            <Link to={`/swap/${swap._id}`}>
                <h4>{swap.pName}</h4>
                <p><strong>Doctor: </strong>{swap.dName}</p>
                <p><strong>Date: </strong>{format(new Date(swap.slot), 'PPP')}</p>
                <p><strong>Time: </strong>{format(new Date(swap.slot), 'p')}</p>
                {error && <div className="error">{error}</div>}
            </Link>
            <span onClick={cancelHandler}>Cancel</span>
        </div>  
    );
}
 
export default SwapDetails;