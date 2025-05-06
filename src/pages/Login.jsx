import Navigation from "../components/Navigation";
import logo from "../img/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
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
  
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };  

    return (
        <>
            <Navigation />
            <div id="login">
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
                        <button type="submit" className="focus-button">LOGIN</button>
                        <p>Need an account? <a href="#">Sign Up</a></p>
                    </form>
            </div>
        </>
    )
}

export default Login;