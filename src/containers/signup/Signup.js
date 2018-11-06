import React, { Component } from "react";
import {

  FormGroup,
  FormControl,
  ControlLabel,
  Label
} from "react-bootstrap";
import LoaderButton from "../others/LoaderButton";
import "./Signup.css";
import APIService from "../../utils/api/APIService";

import FormField from './FormField';
import PasswordField from './PasswordField';
import File64Field from './File64Field';



export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.valdiateEmail=this.validateEmail.bind(this);
   // this.handleChange=this.handleChange.bind(this,null);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: null,
      newUser: null,
      emailvalidationstate:null,
      passwordvalidationstate:null,
      confirmPasswordvalidationstate:null,
      

    };
  }

  validateForm() {
    return (
      this.state.emailvalidationstate &&
      this.state.passwordvalidationstate &&
      this.state.confirmPasswordvalidationstate
    );
  }




  handleChange = (event,validatstate) => {
    this.setState({
      [event.target.id]: event.target.value
    });
    this.setState({
      [event.target.id+"validationstate"]: validatstate
    });
    
  }
  
  validateEmail(e)
  {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(e.target.value).toLowerCase())
    
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      //implement registration using API
      const client = new APIService();
      await client.signup(this.state.email, this.state.email, this.state.password, this.state.confirmPassword, this.state.profilePicture)
      await client.login(this.state.email, this.state.password);
      this.setState({ isLoading: false });
      if (await client.getToken()) {
        this.props.userHasAuthenticated(true);
        this.props.history.push("/member");
      }
    }
    catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }
  handleFileChange = event => {
    this.setState({
      profilePicture: event.target.files[0]
    })
  }
  validateConfirmPassword = event =>{
    return this.state.password===event.target.value;
  }
  getFiles(files) {
    this.setState({ profilePicture: files.base64 })
  }
  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Label>{this.state.email} </Label>
   </FormGroup>*/}
        <FormField 
        type="email" 
        controlid="email"
        validationstate={this.state.emailvalidationstate}
        name="Email"
        value={this.state.email} 
        validate={this.validateEmail}
        handlechange={this.handleChange} 
        required={true} 
        placeholder={"xxxxx@xxxx.com"} 
        helptext={"Email is mandatory"} 
        autoFocus/>

    {/*<FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
  </FormGroup>*/}
        <PasswordField
        validationstate={this.state.passwordvalidationstate}
        value={this.state.password}
        handlechange={this.handleChange}
        
        >
        
        </PasswordField>

       { /*<FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />

</FormGroup>*/}
      <FormField 
        type="password" 
        controlid="confirmPassword"
        validationstate={this.state.confirmPasswordvalidationstate}
        name="Confirm Password"
        value={this.state.confirmPassword} 
        validate={this.validateConfirmPassword}
        handlechange={this.handleChange} 
        required={true} 
        placeholder={"Confirm Password"} 
        helptext={"Confirm Password is mandatory , and should be same as your password"} 
        autoFocus/>

        <FormGroup controlId="ProfilePicture" bsSize="large">
          <ControlLabel>ProfilePicture</ControlLabel>

          <File64Field
            multiple={false}
            onDone={this.getFiles.bind(this)} accept=".jpg,.jpeg,.png" />
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
        {this.renderForm()}

      </div>
    );
  }
}