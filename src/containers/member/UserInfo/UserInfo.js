import React, { Component } from 'react';
import { Image, Row, Col, Panel } from "react-bootstrap";
import './UserInfo.css';
import defaultimage from './default-image.jpg';
export default class UserCard extends Component {
  constructor(props) {
    super(props);
    //     console.log(props);

    this.state = {
      isLoading: true
    }
  }

  render() {

    return (
      !(this.props.userdata == null) ?

        <Row >
          <Col >
            <Panel>
              <Panel.Heading>Profile</Panel.Heading>
              <Panel.Body>
                <Image className="imgclass" src={
                this.props.userdata.profilePicture == null ?
                  defaultimage
                  : this.props.userdata.profilePicture
              } circle  >

              </Image></Panel.Body>
              <Panel.Body>
                <small> {this.props.userdata.userName}</small></Panel.Body>
            </Panel>

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
