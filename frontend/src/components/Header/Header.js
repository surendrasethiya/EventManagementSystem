import React, { useState,useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import ReactSwitch from "react-switch";
import { ThemeContext } from '../../App';
 

export default function Header({isLoggedIn}) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    

    const [mobileView, setMobileView] = useState(false)

    function handleHamburgerClick() {
        setMobileView(true)
    }

    function handleCrossClick() {
        setMobileView(false)
    }

    function handleProfileClick(){
        setMobileView(false)
    }


    let nav_link = [{
        path: '/home',
        display: "Home"
    },
    {
        path: '/about',
        display: "About"
    },
    {
        path: '/venue',
        display: "Venues"
    }
    ]
    return (
        <div>
            <div className={styles.headerWrapper}>
                <Link to='/home' className={styles.logoWrapper}>
                    <img src='logo.png' alt='logo' className={styles.logo} />
                </Link>

                <div className={styles.headerMenuWrapper}>
                    <ul className={styles.headerMenu}>
                        {nav_link.map((item, index) => (
                            <li key={index}>
                                <NavLink to={item.path}>{item.display}</NavLink>
                            </li>
                        ))}
                    </ul>
                    
                </div>
                <div className="switch">
      <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
      <ReactSwitch
        onChange={toggleTheme} // Call toggleTheme when the switch changes
        checked={theme === "light"} // Set the switch state based on the theme
      />
    </div>


                <div className={styles.headerButtonWrapper}>
                    {!isLoggedIn &&<NavLink to='/login'><button className={`${styles.headerButton} ${styles.sec_button} `}>Login</button></NavLink>}
                    {!isLoggedIn&&<NavLink to='/signup'><button className={`${styles.headerButton} ${styles.primary_button}`}>Signup</button></NavLink>}
                    {isLoggedIn && <NavLink to='/profile'><button className={`${styles.headerButton} ${styles.profile_button} `} title='profile'>👤</button></NavLink>}
                    {mobileView && <button className={`${styles.headerButton} ${styles.cross}`} onClick={handleCrossClick}>&#x2715;</button>}
                    {!mobileView && <button className={`${styles.headerButton} ${styles.hamburger}`} onClick={handleHamburgerClick}>&#x2630;</button>}
                </div>
            </div>
            {mobileView && <div className={styles.mobileView}>
                <ul>
                   <NavLink to='/login' onClick={handleCrossClick}><li>Login</li></NavLink>
                   <NavLink to='/signup' onClick={handleCrossClick}><li>Signup</li></NavLink>
                   <NavLink to='/profile' onClick={handleProfileClick}><li>Profile</li></NavLink>
                    {nav_link.map((item, index) => (
                            <NavLink to={item.path} key={index} onClick={handleCrossClick}><li>{item.display}</li></NavLink>
                    ))}
                </ul>
            </div>
            
            }
            
        </div>
    )
}
