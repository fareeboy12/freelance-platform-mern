import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the user data
const authContext = createContext();

// Create a context provider component to wrap your app
export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    accountType: '',
    country: '',
    state: '',
    city: '',
  });

  const [freelancerDetail, setFreelancerDetail] = useState({
    id: '',
    profileTitle: '',
    hourlyRate: '',
    skills: [],
    description: '',
    userId: ''
  });

  const [employerDetail, setEmployerDetail] = useState({
    id: '',
    companyName: '',
    companySize: '',
    description: '',
    userId: ''
  });

  const [token, setToken] = useState('');

  useEffect(() => {
    // Initialize userData from local storage if available
    const storedUserData = localStorage.getItem('userData');
    // const storedFreelancerDetail = localStorage.getItem('freelancerDetail');
    // const storedEmployerDetail = localStorage.getItem('employerDetail');
    const storedToken = localStorage.getItem('token');
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    try {
      // Attempt to parse the stored data from localStorage for freelancerDetail
      const storedFreelancerDetail = localStorage.getItem('freelancerDetail');
      const parsedFreelancerDetail = storedFreelancerDetail !== "undefined" ? JSON.parse(storedFreelancerDetail) : null;

      // Check if parsedFreelancerDetail is an object
      if (parsedFreelancerDetail && typeof parsedFreelancerDetail === 'object') {
        setFreelancerDetail(parsedFreelancerDetail);
      } else {
        // If parsed data is not an object, set default values
        setFreelancerDetail({
          id: '',
          profileTitle: '',
          hourlyRate: '',
          skills: [],
          description: '',
          userId: ''
        });
      }
    } catch (error) {
      // Handle JSON parsing error, set default values
      console.error('Error parsing storedFreelancerDetail:', error);
      setFreelancerDetail({
        id: '',
        profileTitle: '',
        hourlyRate: '',
        skills: [],
        description: '',
        userId: ''
      });
    }

    try {
      // Attempt to parse the stored data from localStorage for employerDetail
      const storedEmployerDetail = localStorage.getItem('employerDetail');
      const parsedEmployerDetail = JSON.parse(storedEmployerDetail) ? JSON.parse(storedEmployerDetail) : null;

      // Check if parsedEmployerDetail is an object
      if (parsedEmployerDetail && typeof parsedEmployerDetail === 'object') {
        setEmployerDetail(parsedEmployerDetail);
      } else {
        // If parsed data is not an object, set default values
        setEmployerDetail({
          id: '',
          companyName: '',
          companySize: '',
          description: '',
          userId: ''
        });
      }
    } catch (error) {
      // Handle JSON parsing error, set default values
      console.error('Error parsing storedEmployerDetail:', error);
      setEmployerDetail({
        id: '',
        companyName: '',
        companySize: '',
        description: '',
        userId: ''
      });
    }


    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to set user data
  const setUser = (data) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const setFreelancer = (data) => {
    setFreelancerDetail(data);
    localStorage.setItem('freelancerDetail', JSON.stringify(data));
  };

  const setEmployer = (data) => {
    setEmployerDetail(data);
    localStorage.setItem('employerDetail', JSON.stringify(data));
  };

  const setAuthToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {

    setUserData({
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      accountType: '',
      country: '',
      state: '',
      city: '',
    });

    setFreelancerDetail({
      id: '',
      profileTitle: '',
      hourlyRate: '',
      skills: [],
      description: '',
      userId: ''
    });

    setEmployerDetail({
      id: '',
      companyName: '',
      companySize: '',
      description: '',
      userId: ''
    });

    setToken('');
  
    // Clear user data from local storage
    localStorage.removeItem('userData');
    localStorage.removeItem('freelancerDetail');
    localStorage.removeItem('employerDetail');
    localStorage.removeItem('token');
  };

  return (
    <authContext.Provider value={{ userData, setUser, freelancerDetail, setFreelancer, employerDetail, setEmployer, token, setAuthToken, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useUser() {
    return useContext(authContext);
  }
