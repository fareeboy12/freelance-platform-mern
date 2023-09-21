import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          {/* Add more routes as needed */}
      </Routes>
    </>
  )
}

export default App
