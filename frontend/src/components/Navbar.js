import { Link, NavLink, useNavigate } from "react-router-dom";
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const navigation = useNavigate()
    
    const handleClick = () => {
        logout()
        navigation('/login')
    }

    return (
        <header>
            <div className="navbar">
                <Link to="/"><h1>SWYNC</h1></Link>
                <div className="links">
                    <NavLink to="/bookings" activeClassName="active">Bookings</NavLink>
                    <NavLink to="/swap" activeClassName="active" >Swaps</NavLink>
                </div>
                <nav>
                    {!user && (<div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>)}
                    {user &&(<div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>)}
                </nav>
            </div>
        </header>
    );
}
 
export default Navbar;