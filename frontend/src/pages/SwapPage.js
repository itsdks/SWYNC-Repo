import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import SwapOptions from '../components/SwapOptions';
import { useAuthContext } from '../hooks/useAuthContext';

const SwapPage = () => {
    const {user} = useAuthContext()
    const [swapping, setSwapping] = useState(null);
    const [error, setError] = useState(null);
    const {id} = useParams();

    useEffect(() => {

        const fetchSwapping = async () => {
            const response = await fetch('/api/swap/' + id, {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            console.log(json)

            if(response.ok){
                setSwapping(json);
                setError(null);
            } else{
                setError(json.error);
            }
        }

        if(user){
            fetchSwapping()
        }
    }, [user])

    return (
        <div className="swap-details">
            <h2>Swap with</h2>
            {swapping && swapping.map(swap => (
                <SwapOptions swap={swap} id={id} key={swap._id} />
            ))}
        </div>
    );
}
 
export default SwapPage;