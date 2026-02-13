import "./Login.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


const Login = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
   e.preventDefault();
   setError("");

  if (!email || !password) {
    setError("Email and password are required");
    return;
  }

  setLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // optional: access user
    const user = userCredential.user;
    console.log("Logged in user:", user);

    // redirect after login
    navigate("/dashboard");
  } catch (err) {
    switch (err.code) {
      case "auth/user-not-found":
        setError("No account found with this email");
        break;
      case "auth/wrong-password":
        setError("Incorrect password");
        break;
      case "auth/invalid-email":
        setError("Invalid email format");
        break;
      default:
        setError("Login failed. Please try again");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        
        {error && <p style={{color:"red"}}>{error}</p>}


        <form className="login-form" onSubmit={handleSubmit}>
          <h5 style={{textAlign:"left"}}>Email address</h5>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <h5 style={{textAlign:"left"}}>Password</h5>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="signup-text">
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
