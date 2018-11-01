import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home/Home";
import NotFound from "./containers/others/NotFound";
import Login from "./containers/login/Login";
import AppliedRoute from "./utils/AppliedRoute";
import Signup from "./containers/signup/Signup";
import AuthenticatedRoute from "./utils/AuthenticatedRoute";
import UnauthenticatedRoute from "./utils/UnauthenticatedRoute";
import UserFeed from "./containers/member/Feed/UserFeed";


export  default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/SignUp" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/member" exact component={UserFeed} props={childProps}/>
    <Route component={NotFound} />
  </Switch>;