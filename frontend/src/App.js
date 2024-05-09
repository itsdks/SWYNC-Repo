import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import DoctorPage from './pages/DoctorPage'
import Booking from './pages/Booking';
import BookingPage from './pages/BookingPage';
import Swap from './pages/Swap';
import SwapPage from './pages/SwapPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login"/>}
            />
            <Route
              path="/doctor/:id"
              element={user ? <DoctorPage /> : <Navigate to="/login"/>}
            />
            <Route
              path="/bookings"
              element={user ? <Booking /> : <Navigate to="/login"/>}
            />
            <Route
              path="/bookings/:id"
              element={user ? <BookingPage /> : <Navigate to="/login"/>}
            />
            <Route
              path="/swap"
              element={user ? <Swap /> : <Navigate to="/login"/>}
            />
            <Route
              path="/swap/:id"
              element={user ? <SwapPage /> : <Navigate to="/login"/>}
            />
            <Route
              path="/login"
              element={!user ? <Login/> : <Navigate to="/"/>}
            />
            <Route
              path="/signup"
              element={!user ? <Signup/> : <Navigate to="/"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;