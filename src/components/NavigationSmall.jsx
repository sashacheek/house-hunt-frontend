import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import hamburger from "../img/burger-menu.svg"

function NavigationSmall() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const email = localStorage.getItem("email");
    
      useEffect(() => {
        const token = localStorage.getItem("auth_token");
        setIsLoggedIn(token);
      }, []);
    
      const handleLogout = () => {
        localStorage.removeItem("auth_token");
        setIsLoggedIn(false);
      };

    const expandMenu = () => {
        let nav = document.getElementById("navigation-small");
        let navClasses = Array.from(nav.classList);
        let hamburgerButton = document.getElementById("hamburger-button")
        if (navClasses.includes("expanded")) {
            nav.classList.remove("expanded");
            hamburgerButton.classList.remove("hidden");
        } else {
            nav.classList.add("expanded");
            hamburgerButton.classList.add("hidden");
        }
    }

    return (
        <>
        <img id="hamburger-button" src={hamburger} onClick={expandMenu}></img>
        <div id="nav-small">
            <h1 id="title">HouseHunt</h1>
            <nav id="navigation-small">
                <div id="close-x">
                    <p onClick={expandMenu}>X</p>
                </div>
                <Link to="/">Home</Link>

                {isLoggedIn ? (
                    <>
                    <Link to="/yourlistings">Your Listings</Link>
                    <Link onClick={handleLogout} to="/">Logout</Link>
                    <Link to="/">Hi, {email}</Link>
                    </>
                ) : (
                    <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </nav>
        </div>
        </>
    )
}

export default NavigationSmall;