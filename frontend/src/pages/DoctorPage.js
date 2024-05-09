import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from "../hooks/useAuthContext";

const DoctorPage = () => {
    const {user} = useAuthContext()
    const {id} = useParams();
    const [doctor, setDoctor] = useState(null);
    const [pName, setName] = useState('');
    const [pAge, setAge] = useState(0);
    const [pGender, setGender] = useState('Male');
    const [slot1, setSlot] = useState(new Date());
    const [error, setError] = useState(null);
    const navigation = useNavigate();
    var dID = id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
            setError('You must be logged in')
            return
        }
        var dName = doctor.name;
        var slot = slot1.toISOString();
        const booking = { pName, pAge, pGender, dID, dName, slot };
    
        const response = await fetch('/api/doctor', {
          method: 'POST',
          headers: { 
            "Content-Type": "application/json", 
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(booking)
        })
        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
        }
        if(response.ok) {
            setError(null);
            navigation('/');
        }
    }

    useEffect(() => {
        const fetchDoctor = async () => {
            const response = await fetch('/api/doctor/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                setDoctor(json)
            }
        }

        if(user){
            fetchDoctor()
        }
    }, [user])

    return (
        <div className="doctor">
            {doctor && (
            <article>
                <h2>{doctor.name}</h2>
                <p><strong>Specialisation: {doctor.specialisation}</strong></p>
                <div className="book">
                    <form onSubmit={handleSubmit}>
                    <label>Patient Name:</label>
                    <input 
                        type="text" 
                        required 
                        value={pName}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Patient Age:</label>
                    <input 
                        type="number" 
                        required 
                        value={pAge}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <label>Patient Gender:</label>
                    <select
                        value={pGender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>
                    <label>Slot:</label>
                    <DatePicker
                        wrapperClassName="datePicker" 
                        dateFormat="MMMM d, yyyy h:mm aa"  
                        showTimeSelect  
                        timeFormat="HH:mm"  
                        timeIntervals={60}  
                        timeCaption="Time"  
                        selected={slot1}
                        onChange={(e) => setSlot(e)} 
                    />
                    <button>Book Now</button>
                    {error && <div className="error">{error}</div>}
                </form>
                </div>
            </article>
        )}
        </div>
        
    );
}
 
export default DoctorPage;