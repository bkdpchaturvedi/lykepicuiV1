import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home/Home";
import NotFound from "./containers/others/NotFound";
import Login from "./containers/login/Login";
import AppliedRoute from "./utils/AppliedRoute";
import Signup from "./containers/signup/Signup";


export  default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/SignUp" exact component={Signup} props={childProps} />
    <Route component={NotFound} />
  </Switch>;