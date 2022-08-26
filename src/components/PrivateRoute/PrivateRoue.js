import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute(props) {
  return localStorage.getItem("uID") ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
}
