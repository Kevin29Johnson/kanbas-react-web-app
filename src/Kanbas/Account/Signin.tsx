import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <input
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="form-control mb-2"
        placeholder="username"
        id="wd-username"
      />
      <div className="position-relative">
        <input
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="form-control mb-2"
          placeholder="password"
          type={showPassword ? "text" : "password"}
          id="wd-password"
        />
        <span
          className="position-absolute end-0 top-50 translate-middle-y pe-2"
          style={{ cursor: "pointer" }}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100"
      >
        Sign in
      </button>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
