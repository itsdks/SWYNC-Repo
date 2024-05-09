import {useEffect, useState} from 'react'
import DoctorDetails from '../components/DoctorDetails'
import {useAuthContext} from '../hooks/useAuthContext'

const Home = () => {
    const [doctors, setDoctors] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('/api/doctor', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                setDoctors(json)
            }
        }

        if(user){
            fetchDoctors()
        }
    }, [user])

    return (
        <div className="home">
            <h2>Available doctors</h2>
            <div className="doctors">
                {doctors && <DoctorDetails doctors={doctors}/>}
            </div>
        </div>
    );
}
 
export default Home;