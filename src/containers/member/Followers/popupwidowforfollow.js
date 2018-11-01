import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel ,ListGroup,ListGroupItem,Row} from "react-bootstrap";
import LoaderButton from "../../others/LoaderButton";
import config from "../../config";
import APIService from '../../../utils/api/APIService';



export default class FollowModal extends Component {
    constructor(props) {
        super(props);
    
       // this.file = null;
    
        this.state = {
          isLoading: null,
          value: "",
          suggestions: []


        };
      }
      async escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      
      async getSuggestions() {
        let escapedValue = await this.escapeRegexCharacters(this.state.value.trim());
        
        if (escapedValue === '') {
          return [];
        }
      
      //  let regex = new RegExp('^' + escapedValue, 'i');
        let cli = new APIService();
        //call api to retrive the search text
        await cli.SearchFriends(escapedValue).then(res=>{this.setState({suggestions:res})});
      
        
      }
       handleFollow= async (event,userId) => {
         //console.log(event);
         //console.log(userId);
event.preventDefault();
        this.setState({isLoading:true});
        try {
            let cli=new APIService();
            //let userId=userId;
            await cli.Follow(userId);
            this.setState({isLoading:false});
            await this.fetchdata();
            this.props.onHide();
        } catch (error) {
            this.setState({isLoading:false});
        }


    }
     
      
 
    
      handleSubmit = async event => {
        event.preventDefault();
    
        this.setState({ isLoading: true });
        try {
          //implement upload of content using API
        await this.getSuggestions();
        this.setState({ isLoading: false });
         // this.props.onHide();
         

          
          //this.props.history.push("/");
        } catch (e) {
          alert(e);
          
        }
        
      }
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
       // this.getSuggestions(event.target.value);
      }
      validateForm() {
        return this.state.value.length > 2;
      }
    renderForm() {
     // const { value, suggestions } = this.state;
      // const inputProps = {
      //   placeholder: "Type two characters minimum",
      //   value,
      //   onChange: this.onChange
      // };
      
      return (
        
         <Row>
      <form onSubmit={this.handleSubmit}>
       <FormGroup controlId="value" bsSize="large">
          <ControlLabel>Search People to Add</ControlLabel>
          <FormControl
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <LoaderButton
            block
            bsStyle="primary"
            bsSize="xsmall"
            disabled={!this.validateForm()}
            type="submit"
           
            isLoading={this.state.isLoading}
            text="search"
            loadingText="searching...."
          />
        </form>
        <ListGroup>
          {
            
           this.state.suggestions.length>0?
           this.state.suggestions.map((val, index) => (
            
           <ListGroupItem key={val.userId} header={val.userName}>
           
           <LoaderButton
            block
            bsStyle="danger" bsSize="xsmall"
            disabled={!this.validateForm()}
            type="button"
            onClick={(event) => this.handleFollow(event,val.userId)}
            key={val.userId}
            id={val.userId}
            isLoading={this.state.isLoading}
            text="Follow"
            loadingText="following...."
            
          />
           
            </ListGroupItem>))
            
            
           
           :
           
                <ListGroupItem header="Not matching users found ">0 result </ListGroupItem>
               
          }
        </ListGroup>
        </Row>
      );
      }

     

      
    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered="true"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {this.renderForm()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }