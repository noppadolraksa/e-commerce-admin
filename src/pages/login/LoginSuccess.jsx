import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

const LoginSuccess = () => {
  const history = useHistory();
  const handleClick = useCallback((e) => history.push(`/`), [history]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>login success..</p>
        <button style={{}} onClick={handleClick}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginSuccess;
