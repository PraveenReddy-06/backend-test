import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth, ROLES } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import "./Auth.css";

const API_BASE = "http://localhost:8080/api/auth";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: ROLES.USER
};

function Auth() {

  const [mode, setMode] = useState("sign-in");
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const { setCurrentUser, setRole } = useAuth();
  const { theme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const toggle = () => {
    setMode(prev => (prev === "sign-in" ? "sign-up" : "sign-in"));
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // LOGIN

  const handleLogin = async (e) => {

    e.preventDefault();
    setError("");

    try {

      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setCurrentUser(data);
      setRole(data.role);

      const redirect =
        from || (data.role === ROLES.ADMIN ? "/admin" : "/dashboard");

      navigate(redirect, { replace: true });

    } catch (err) {
      setError(err.message);
    }
  };

  // REGISTER

  const handleRegister = async (e) => {

    e.preventDefault();
    setError("");

    try {

      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMode("sign-in");

      setFormData({
        ...initialFormData,
        email: formData.email
      });

    } catch (err) {
      setError(err.message);
    }
  };

  return (

    <div className={`auth-container ${mode} ${theme}`}>

      <div className="auth-row">

        {/* SIGN UP */}

        <div className="auth-col auth-align-center auth-flex-col sign-up">

          <div className="auth-form-wrapper auth-align-center">

            <form className="auth-form sign-up" onSubmit={handleRegister}>

              <div className="auth-input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value={ROLES.USER}>User</option>
                  <option value={ROLES.ADMIN}>Admin</option>
                </select>
              </div>

              {error && <p className="auth-error-msg">{error}</p>}

              <button type="submit">Sign up</button>

              <p>
                Already have an account?{" "}
                <span onClick={toggle} className="auth-pointer">
                  Sign in here
                </span>
              </p>

            </form>

          </div>

        </div>


        {/* SIGN IN */}

        <div className="auth-col auth-align-center auth-flex-col sign-in">

          <div className="auth-form-wrapper auth-align-center">

            <form className="auth-form sign-in" onSubmit={handleLogin}>

              <div className="auth-input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="auth-error-msg">{error}</p>}

              <button type="submit">Sign in</button>

              <p>
                Don't have an account?{" "}
                <span onClick={toggle} className="auth-pointer">
                  Sign up here
                </span>
              </p>

            </form>

          </div>

        </div>

      </div>

      <div className="auth-content-row">

        <div className="auth-col auth-align-center auth-flex-col">
          <div className="auth-text sign-in">
            <h2>Welcome</h2>
          </div>
        </div>

        <div className="auth-col auth-align-center auth-flex-col">
          <div className="auth-text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>

      </div>

      <div className="auth-back-home">
        <Link to="/">← Back to Home</Link>
      </div>

    </div>
  );
}

export default Auth;