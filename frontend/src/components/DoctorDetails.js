import { Link } from "react-router-dom";

const DoctorDetails = ({doctors}) => {
    return (
        <div className="doctor-list">
            {doctors.map(doctor => (
                <div className="doctor-details" key={doctor._id}>
                    <Link to={`/doctor/${doctor._id}`}>
                        <h4>{doctor.name}</h4>
                        <p><strong>Specialisation: </strong>{doctor.specialisation}</p>
                    </Link>
                </div>  
            ))}
        </div>
    );
}
 
export default DoctorDetails;