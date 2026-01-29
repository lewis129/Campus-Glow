import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile", { replace: true });
    } catch (err) {
      console.error("login Error:", err.message);
    }
  }

  return (
    <div className="signup">
      <div className="signup-header">
        <img src="images/sc-gucci.jpg" alt="" />
        <h2>Join Campus Glow</h2>
        <h3>Login to your account to continue shopping</h3>
      </div>
      <div className="signup-body-list">
        <div className="signup-body-card">
          <h4>Email</h4>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
        <div className="signup-body-card">
          <h4>password</h4>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
      </div>
      <div className="signup-tail">
        <button
          className="signup-btn"
          type="submit"
          onClick={(e) => handleLogin(e)}
        >
          {loading ? "logging in..." : "logging"}
        </button>
        <p>or</p>
        <p>Don't have an account</p>
        <Link to="/signup">
          <button className="signup-btn signup-loginbtn">signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
