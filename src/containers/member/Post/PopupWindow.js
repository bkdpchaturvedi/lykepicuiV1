import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../others/LoaderButton";
import config from "../../config";
import APIService from '../../../utils/api/APIService';

import FileBase64 from 'react-file-base64';



export default class MyVerticallyCenteredModal extends Component {
    constructor(props) {
        super(props);
    
       // this.file = null;
    
        this.state = {
          isLoading: null,
          content: "",
          file: ""
        };
      }
    
      validateForm() {
        return this.state.content.length > 0;
      }
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        console.log(event.target.value)
      }
    
      handleFileChange = event => {
        this.file = event.target.files[0];
      }
      getFiles(files){
        this.setState({ file: files })
      }
    
      handleSubmit = async event => {
        event.preventDefault();
    
        if (this.state.file && this.state.file.size > config.MAX_ATTACHMENT_SIZE) {
          alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
          return;
        }
        this.setState({ isLoading: true });
        try {
          //implement upload of content using API
         const cli =new APIService();
          await cli.addUserPost(this.state.content,this.state.file)
          this.props.onHide();
          this.setState({ isLoading: false });

          
          //this.props.history.push("/");
        } catch (e) {
          alert(e);
          
        }
        
      }
    renderForm() {
        return (
          <div className="NewPost">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="content">
              <ControlLabel>Description</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.content}
                  componentClass="textarea"
                />
              </FormGroup>
              <FormGroup controlId="file">
                <ControlLabel>Attachment</ControlLabel>
                <FileBase64
        multiple={ false }
        onDone={ this.getFiles.bind(this) } />
              </FormGroup>
              <LoaderButton
                block
                bsStyle="primary"
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Create"
                loadingText="Creating…"
              />
            </form>
          </div>
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