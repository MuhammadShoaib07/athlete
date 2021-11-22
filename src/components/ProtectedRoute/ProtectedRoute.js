import React from "react";
import { Redirect, Route, useHistory } from "react-router";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  //   const redirect = history.replace("/login");
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
