import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Create auth user
      const userCred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCred.user;

      // 2️⃣ Save profile to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        mail: formData.email,
        phone: formData.phone,
        createdAt: serverTimestamp(),
      });

      // 3️⃣ Go to profile
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div class="signup">
        <div class="signup-header">
          <img src="images/sc-gucci.jpg" alt="" />
          <h2>Join Campus Glow</h2>
          <h3>create your account to start shopping</h3>
        </div>
        <div class="signup-body-list">
          <div class="signup-body-card">
            <h4>Full Name</h4>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div class="signup-body-card">
            <h4>Email</h4>
            <input
              name="email"
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div class="signup-body-card">
            <h4>Phone Number</h4>
            <input
              name="phone"
              type="tel"
              placeholder="PhoneNumber"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div class="signup-body-card">
            <h4>Password</h4>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div class="signup-tail">
          <button
            class="signup-btn"
            type="submit"
            disabled={loading}
            onClick={(e) => handleSignUp(e)}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
          <p>or</p>
          <p>Already have an account?</p>
          <Link to="/login">
            <button class="signup-btn signup-loginbtn">login</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;
