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

  useEffect(() => {
    // Initialize userData from local storage if available
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Function to set user data
  const setUser = (data) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const logout = () => {
    setUserData({
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      accountType: '',
    });
  
    // Clear user data from local storage
    localStorage.removeItem('userData');
  };

  return (
    <authContext.Provider value={{ userData, setUser, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useUser() {
    return useContext(authContext);
  }
