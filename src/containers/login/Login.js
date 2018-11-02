import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import LoaderButton from "../others/LoaderButton";
import APIService from "../../utils/api/APIService";


export default class Login extends Component {
 
  constructor(props)
  {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(event.target.value)
  }

  handleSubmit =async event => {
    event.preventDefault();
    //implement API login and assign token
    this.setState({ isLoading: true });
    try{
      const APIServicecli=new APIService();
      await APIServicecli.login(this.state.email,this.state.password);
      if( await APIServicecli.getToken())
      {
        this.props.userHasAuthenticated(true);
        this.props.history.push("/member");
      }
      else{
        this.props.userHasAuthenticated(false);
        this.props.history.push("/");
      }

      this.setState({ isLoading: false });
    }
    catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }
 

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>UserName</ControlLabel>
            <FormControl
              autoFocus
              type="UserName"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}