import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./Application-Views";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const DockDynasty = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("dd_user")) {
          return (
            <>
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);