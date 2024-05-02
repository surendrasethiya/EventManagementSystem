import React, { useState,useEffect } from "react";
import Header from '../Header/Header'
import Router from '../../router/Router'
import Footer from '../Footer/Footer'


export default function Layout(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType,setUserType]=useState('regular')

    
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem("isLoggedIn");
        if (storedLoginStatus) {
          setIsLoggedIn(JSON.parse(storedLoginStatus));
        }
        // Check for user type in localStorage
         const storedUserType = localStorage.getItem("userType");
         if (storedUserType) {
             setUserType(JSON.parse(storedUserType));
         }
      }, []);
    
    //  Update localStorage and state when login status changes
      const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
      };
    
  //     const handleLogout = () => {
  //       setIsLoggedIn(false);
  //       localStorage.setItem("isLoggedIn", JSON.stringify(false));

  //       if (userType !== 'admin') {
  //         setUserType('regular');
  //         localStorage.setItem('userType', JSON.stringify('regular'));
  //     }
  //      else {
  //       localStorage.removeItem('userType'); // Clear userType from localStorage if the user is admin
  //   }
  // };



  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", JSON.stringify(false));

    const userType = localStorage.getItem('userType');
    if (userType && userType !== 'admin') {
        setUserType('regular');
        localStorage.setItem('userType', JSON.stringify('regular'));
    } else {
        localStorage.removeItem('userType');
    }
};
       
      
   
  //   const handleLogout = () => {
  //     setIsLoggedIn(false);
  //     localStorage.setItem("isLoggedIn", JSON.stringify(false));
  
  //     // Clear userType from localStorage
  //     localStorage.removeItem('userType');
  
  //     // Set the userType state to 'regular'
  //     setUserType('regular');
  // };

      const handleUserType = (type) => {
        setUserType(type);
        localStorage.setItem('userType', JSON.stringify(type));
      };

  
    return (
        <>
        <Header isLoggedIn={isLoggedIn}  />
        <Router handleLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={isLoggedIn} handleUserType={handleUserType} userType={userType}/>
        <Footer/>
        </>
    )
}