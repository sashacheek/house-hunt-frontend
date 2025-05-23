import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    console.log("aaa")
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
  };

    return (
        <nav id="navigation">
        <Link to="/" id="main-title">HouseHunt</Link>
            <form>
                <input placeholder="This has not been implemented yet"></input>
            </form>
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
    )
}

export default Navigation;