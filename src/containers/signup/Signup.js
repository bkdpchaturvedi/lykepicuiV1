import React, { Component } from "react";
import {
 
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../others/LoaderButton";
import "./Signup.css";
import APIService from "../../utils/api/APIService";

import FileBase64 from 'react-file-base64';


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture:null,
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try{
        //implement registration using API
        const client=new APIService();
       await client.signup(this.state.email,this.state.email,this.state.password,this.state.confirmPassword,this.state.profilePicture)
       await client.login(this.state.email,this.state.password);
       this.setState({ isLoading: false });
       // this.props.userHasAuthenticated(true);
        this.props.history.push("/");
    }
    catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }
  handleFileChange = event => {
    this.setState({
      profilePicture:event.target.files[0]
    }) 
  }
  getFiles(files){
    this.setState({ profilePicture: files.base64 })
  }
  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
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
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="ProfilePicture" bsSize="large">
          <ControlLabel>ProfilePicture</ControlLabel>
          
           <FileBase64
             accept=".jpg,.gif,.png" 
        multiple={ false }
        onDone={ this.getFiles.bind(this) } />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        { this.renderForm()}
        
      </div>
    );
  }
}