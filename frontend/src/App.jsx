import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import FreelancerDashboard from './components/freelancer/FreelancerDashboard';
import EmployerDashboard from './components/employer/EmployerDashboard';
import EmployerNavbar from './components/employer/EmployerNavbar';
import FreelancerNavbar from './components/freelancer/FreelancerNavbar';
import PostAJob from './components/employer/PostAJob';
import ProtectedRoutes from './components/ProtectedRoute/ProtectedRoutes';
import { useUser } from './context/authContext';
import SingleJob from './components/freelancer/SingleJob';
import ApplyToJob from './components/freelancer/ApplyToJob';
import Proposals from './components/employer/Proposals';
import FreelancerProfile from './components/freelancer/FreelancerProfile';
import EmployerProfile from './components/employer/EmployerProfile';

function App() {
  const { userData } = useUser();
  const navigate = useNavigate();

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
        <Route element={<ProtectedRoutes accountType={["Employer"]}/>} >
            <Route exact path="/employer/dashboard" element={<EmployerDashboard />}/>
            <Route exact path="/post-a-job" element={<PostAJob />} />
            <Route exact path="/applicants/job/:id" element={<Proposals />} />
            <Route exact path="/employer/profile" element={<EmployerProfile />} />
        </Route>

        <Route element={<ProtectedRoutes accountType={["Freelancer"]}/>} >
          <Route exact path="/freelancer/dashboard" element={<FreelancerDashboard />} />
          <Route exact path="/freelancer/profile" element={<FreelancerProfile />} />
          <Route exact path="/proposals/job/:id/apply" element={<ApplyToJob />} />
        </Route>

        <Route exact path="/job/:id" element={<SingleJob />} />
        
        
      </Routes>
    </>
  )
}

export default App;