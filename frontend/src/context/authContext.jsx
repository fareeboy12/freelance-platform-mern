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
  });

  const [freelancerDetail, setFreelancerDetail] = useState({
    id: '',
    profileTitle: '',
    hourlyRate: '',
    skills: [],
    country: '',
    state: '',
    city: '',
    description: '',
    userId: ''
  });

  useEffect(() => {
    // Initialize userData from local storage if available
    const storedUserData = localStorage.getItem('userData');
    const storedFreelancerDetail = localStorage.getItem('freelancerDetail');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    if (storedFreelancerDetail) {
      setFreelancerDetail(JSON.parse(storedFreelancerDetail));
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

  const logout = () => {
    setUserData({
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      accountType: '',
    });

    setFreelancerDetail({
      id: '',
      profileTitle: '',
      hourlyRate: '',
      skills: [],
      country: '',
      state: '',
      city: '',
      description: '',
      userId: ''
    });
  
    // Clear user data from local storage
    localStorage.removeItem('userData');
    localStorage.removeItem('freelancerDetail');
    localStorage.removeItem('token');
  };

  return (
    <authContext.Provider value={{ userData, setUser, setFreelancer, freelancerDetail, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useUser() {
    return useContext(authContext);
  }
