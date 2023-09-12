import React from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectFullname } from "../../redux/authSlice";
import { useLogOutQuery } from "../../app/api/apiSlice";

function Header() {
  const User = useSelector(selectFullname);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess } = useLogOutQuery();

  const Logout = () => {
    if (isSuccess) {
      dispatch(logOut);
      navigate("/");
    }
    navigate("/");
  };

  return (
    <div>
      <header className="header">
        <Link to="">
          <p className="logo"> My App</p>
        </Link>
        <nav>
          {User ? (
            <>
              <Link to="Admin">{User}</Link>
              <button
                style={{ border: "none", background: "none" }}
                disabled={isLoading}
                onClick={Logout}
              >
                LogOut
              </button>
            </>
          ) : (
            <>
              <Link to="login">Login</Link>
              <Link to="aboutus">About Us</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
