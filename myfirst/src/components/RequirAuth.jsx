import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const RequirAuth = ({ children }) => {
  const isAuth =  JSON.parse(localStorage.getItem("isLogin"));
  const location = useLocation();

  if (isAuth !="true" ) {
    return (
      <Navigate
        to={`/login`}
        replace={true}
        state={{ data: location.pathname }}
      />
    );
  }

  return children;
};

export default RequirAuth;
