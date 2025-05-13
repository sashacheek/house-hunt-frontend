import Navigation from "../components/Navigation";
import logo from "../img/logo.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ session: { email, password } })
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
  
      localStorage.setItem("auth_token", data.auth_token);
      localStorage.setItem("email", data.email);
  
      window.location.href = "/";
    } catch (err) {
      setError("Invalid email or password");
    }
  };  

    return (
        <>
            <div className="login-signup">
                    <form onSubmit={handleLogin}>
                        <h1>LOGIN</h1>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" value={email} className="form-input" id="email" required onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                        <label for="password">Password</label>
                            <input type="password" value={password} className="form-input" id="password" required onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button type="submit" className="large-button focus-button">LOGIN</button>
                        <p>Need an account? <Link to="/signup">Sign Up</Link></p>
                    </form>
            </div>
        </>
    )
}

export default Login;