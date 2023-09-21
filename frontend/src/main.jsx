import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios'; // Import Axios

// Set the default base URL for Axios
const baseURL = 'http://localhost:5000';

// Set the default base URL for Axios
axios.defaults.baseURL = baseURL;

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App tab="home" />
  </BrowserRouter>
);