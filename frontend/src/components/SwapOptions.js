import { useNavigate, Link } from "react-router-dom";
import {useState} from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

const {format} = require("date-fns")

const SwapOptions = ({swap, id}) => {
    const {user} = useAuthContext()
    const [error, setError] = useState(null);
    const navigation = useNavigate();
    const bId1 = swap._id
    const bId2 = id

    const swapHandler = async () => {
        if(!user){
            setError('You must be logged in')
            return
        }
        const swapping = {bId1, bId2}
        console.log(swapping)

        const response = await fetch('/api/swap', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
             },
            body: JSON.stringify(swapping)
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
            <h4>{swap.pName}</h4>
            <p><strong>Doctor: </strong>{swap.dName}</p>
            <p><strong>Date: </strong>{format(new Date(swap.slot), 'PPP')}</p>
            <p><strong>Time: </strong>{format(new Date(swap.slot), 'p')}</p>
            {error && <div className="error">{error}</div>}
            <span onClick={swapHandler}>Swap</span>
        </div>  
    );
}
 
export default SwapOptions;