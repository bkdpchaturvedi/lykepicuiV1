import React, { Component, Fragment, Children } from 'react';
import {

    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock
  } from "react-bootstrap";
  import PropTypes from 'prop-types';


class FormField extends Component {
    constructor(props){
        super(props);
       this.handleFormFieldChange= this.handleFormFieldChange.bind(this);

       this.state={
           validationstateclass:null
       }
        
    }
   
    handleFormFieldChange(e)
    {
        let validatestate=null;
      //console.log(this.props);
        if(this.props.validate!==undefined)
        {
            validatestate= this.props.validate(e);
            if(validatestate)
            {
                this.setState({
                    validationstateclass:"success"
                })
               
            }
            else
            {
                this.setState({
                    validationstateclass:"error"
                })
            }
            this.props.handlechange(e,validatestate);
           // this.props.validationstate=validatestate;
            
        } 
        else
        {
        this.props.handlechange(e);
        }
        

    }

    render() {
        return (
            
        <FormGroup controlId={this.props.controlid} bsSize="large" validationState={this.state.validationstateclass}>
        <ControlLabel>{this.props.name}</ControlLabel>
          <FormControl
            value={this.props.value}
            type={this.props.type}
            placeholder={this.props.placeholder}
            onChange={this.handleFormFieldChange}
            autoFocus={true}
          />
          <div>
          {this.Children}
          </div>
          <HelpBlock>{this.props.required?"Required ":""} {this.props.helptext}</HelpBlock> 
        
        
        </FormGroup>
       
        );
    }
}

export default FormField;