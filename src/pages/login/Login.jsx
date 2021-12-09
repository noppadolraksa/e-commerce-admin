import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";

const Login = () => {
  const admin = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    try {
      login(dispatch, { username, password });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    admin.error && alert("You are not an admin !");
  }, [admin.error]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: 20, color: "teal" }}>My-Shop Admin</h2>
      <form>
        <input
          style={{ padding: 10, marginBottom: 20 }}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{ padding: 10, marginBottom: 20 }}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ padding: "10px 20px", cursor: "pointer" }}
          onClick={handleClick}
        >
          Login
        </button>
      </form>
      {admin.error && <p style={{ color: "red" }}>you're not admin...</p>}
    </div>
  );
};

export default Login;
