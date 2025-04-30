import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const email = localStorage.getItem("email");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token); // Set to true if the token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false); // Update state after logout
  };

    return (
        <nav id="navigation">
            <form>
                <input placeholder="Enter City, State, or Zip Code"></input>
                <button type="submit">S</button>
            </form>
            <Link to="/">Home</Link>
            <Link to="/yourlistings">Your Listings</Link>
            {/* <Link to="/login">Login</Link> */}
            {/* <Link to="/login">Hi, User</Link> */}

            {isLoggedIn ? (
                <>
                    <Link onClick={handleLogout} to="/">Logout</Link>
                    <Link to="/">Hi, {email}</Link>
                </>
            ) : (
                    <Link to="/login">Login</Link>
            )}
        </nav>
    )
}

export default Navigation;