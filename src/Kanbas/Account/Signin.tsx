import { Link } from "react-router-dom";
function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input id="wd-username" placeholder="username" className="form-control mb-2" /> 
      <input id="wd-password" placeholder="password" type="password" className="form-control mb-2"/> 
      <Link id="wd-signin-btn"
            to="/Kanbas/Account/Profile"
            className="btn btn-primary w-100">
            Sign in </Link><br />
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>

      {/* <Link id="wd-signin-btn" to="/Kanbas/Dashboard">
        Sign in
      </Link>
      <br />
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
        Sign up
      </Link> */}
    </div>

);}
export default Signin;