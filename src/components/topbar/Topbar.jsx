import React from "react";
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userRedux";
import { deleteAllProduct } from "../../redux/productRedux";
import { Link } from "react-router-dom";

export default function Topbar() {
  const admin = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      await dispatch(logoutUser());
      await dispatch(deleteAllProduct());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            <Link
              style={{ textDecoration: "inherit", color: "inherit" }}
              to="/"
            >
              my-shop admin{" "}
            </Link>
          </span>
        </div>
        <div className="topRight">
          {admin && (
            <p
              onClick={handleLogout}
              style={{ cursor: "pointer", color: "red" }}
            >
              logout
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
