import React from "react";
import "./topbar.css";
import { useSelector } from "react-redux";

export default function Topbar() {
  const admin = useSelector((state) => state.user.currentUser);

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      await localStorage.clear();
      window.location.reload(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">my-shop admin</span>
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
