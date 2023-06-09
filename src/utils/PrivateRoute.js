import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/reusable/Loading";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();

  const { user, isLoading } = useSelector((state) => state.auth);
  //console.log(user, isLoading)
  const email = user.email;

  if (isLoading || !email) {
    return <Loading />;
  }

  if (!isLoading && !email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
