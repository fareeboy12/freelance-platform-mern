import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import FreelancerDashboard from './components/freelancer/FreelancerDashboard';
import EmployerDashboard from './components/employer/EmployerDashboard';
import EmployerNavbar from './components/employer/EmployerNavbar';
import FreelancerNavbar from './components/freelancer/FreelancerNavbar';
import { useUser } from './context/authContext';
import PostAJob from './components/employer/PostAJob';

function App() {
  const { userData } = useUser();

  let NavbarComponent;

  if (userData.accountType === 'Freelancer') {
    NavbarComponent = FreelancerNavbar;
  } else if (userData.accountType === 'Employer') {
    NavbarComponent = EmployerNavbar;
  } else {
    NavbarComponent = Navbar;
  }

  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route exact path="/freelancer/dashboard" element={<FreelancerDashboard />} />
        <Route exact path="/post-a-job" element={<PostAJob />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  )
}

export default App;