import React, { Component } from 'react';
import {Image,Row,Col} from "react-bootstrap";
import './UserInfo.css';
import defaultimage from './default-image.jpg';
export default class UserCard extends Component {
   constructor(props){
     super(props);
     console.log(props);

     this.state = {
      isLoading: true
      }
   }
    
  render() {
  
    return (
        !(this.props.userdata==null) ?

        <Row >
          <Col >
          
            <Image className="title"  src={
              this.props.userdata.profilePicture == null?
              defaultimage
              :this.props.userdata.profilePicture
              } responsive circle  >
            
            </Image>
            
            <small className="title"> {this.props.userdata.userName}</small>
          </Col>
          
         
      </Row>

      : 
      <Row>
      <Col xs={6} md={4}>
      No Data
      </Col>
      </Row>
     


      

    );
  }
}
