import { Link, useLocation } from "react-router-dom";
import "../../App.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logOut, setCredentials } from "../../redux/authSlice";
import { useLoginMutation } from "../../app/api/apiSlice";
function Login() {
  const errRef = useRef();
  const userRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ login: user, password: pwd }).unwrap();
      dispatch(setCredentials(userData));
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  return (
    <main className="login-form">
      <div className="cotainer">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body"></div>
              <form onSubmit={handleSubmit} method="">
                <div className="form-group row">
                  <label
                    for="email_address"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    E-Mail Address
                  </label>
                  <div class="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="login"
                      ref={userRef}
                      value={user}
                      onChange={handleUserInput}
                      autoComplete="off"
                      required
                      autofocus
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    for="password"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Password
                  </label>
                  <div className="col-md-6">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      onChange={handlePwdInput}
                      value={pwd}
                      required
                    />
                  </div>
                </div>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <div className="form-group row">
                  <div className="col-md-6 offset-md-4">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" name="remember" /> Remember Me
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 offset-md-4">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      Login
                    </button>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <Link to="/" className="btn btn-link">
                      Forgot Your Password?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
