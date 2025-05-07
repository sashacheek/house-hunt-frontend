import Navigation from "../components/Navigation";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ session: { email, password } })
      });
  
      if (!response.ok) {
        throw new Error("Sign Up failed");
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
            <div className="login-signup">
                    <form onSubmit={handleSignUp}>
                        <h1>SIGN UP</h1>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" value={email} className="form-input" id="email" required onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                        <label for="password">Password</label>
                            <input type="password" value={password} className="form-input" id="password" required onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button type="submit" className="focus-button">SIGN UP</button>
                        <p>Already have an account? <Link to="/login">Log In</Link></p>
                    </form>
            </div>
        </>
    )
}

export default SignUp;