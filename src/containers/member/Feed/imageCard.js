import React, { Component } from 'react';
import dummyimage from './dummy-image-1024x640.jpeg';
// import {
//     Card, CardImg, CardText, CardBody, Row, Col, Button,
//     CardTitle, CardSubtitle
// } from 'reactstrap';

//import ImageModal from '../imageCard/zoom';
import { Panel,  Image, Row, Col, Badge, ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import APIService from '../../../utils/api/APIService';
const rightcardstyle = {

    border: "none",
    float: "right"

};
const leftcardstyle = {

    border: "none",
    float: "left",
    
    position:"absolute"

};
class ImageCard extends Component {
    constructor(props) {
        super(props);
     //   console.log(props);
        // const ImageCard = (props) => {
        this.state = {
            isLoading: true,
            likeCount: 0,
            posteduserProfile: null
        }
    }

    async componentDidMount() {


        try {
            let cli = new APIService();

            await cli.getpostProfile(this.props.userId).then(res => {
                this.setState({
                    posteduserProfile: res,
                    isLoading:false
                });

            });
        } catch (error) {

        }
    }

    handleLike = async (event) => {
        event.preventDefault();

        await this.putlykeappimage(1);

    }


    handleunLike = async (event) => {
        event.preventDefault();

        await this.putlykeappimage(-1);

    }

    async  putlykeappimage(count) {
        this.setState(prevState => ({
            likeCount: prevState.likeCount >= 0 ? prevState.likeCount + count : 0
        }));




        try {

            // console.log(await API.put(apiName, path, myInit));
            //handle like and dislike API


        } catch (e) {
            alert(e.message);

        }
    }

   

    render() {
//        console.log(this.state.posteduserProfile)
        var desc = "{\"__html\":\"<p style={leftcardstyle} > "+this.props.description+"</p>\"}"
        var descriptionField = JSON.parse(desc)
        if (this.state.isLoading) {
            return (<div className="Loader" >
                <Glyphicon glyph="refresh" className="spinning " bsSize="large" />

            </div>)
        } else {
            return (


                <Panel>
                    <Panel.Body>
                        <p style={leftcardstyle}>
                           
                            <i>Posted By: </i> {!!this.state.posteduserProfile ? this.state.posteduserProfile.userName : ""}
                            
                        </p>
                        <br></br>


                            <div dangerouslySetInnerHTML= {descriptionField}/>

                        <p style={rightcardstyle} >
                        
                        <i>Created On: </i>
        {new Date(this.props.createdon).toLocaleString("en-US")}
                        </p>
                    </Panel.Body>
                    <Panel.Body>
                        <Image src={!!this.props.picture ? this.props.picture : dummyimage} alt="242x200" width="100%" height="200px" thumbnail={true} rounded responsive bsSize="xsmall">
                        </Image>
                    </Panel.Body>

                    <Panel.Footer>
                        <Row>
                            <Col xs={3}>
                                <h5 className="">
                                    Likes <Badge>{this.state.likeCount}</Badge>
                                </h5>
                            </Col>
                            <Col xs={3}>


                            </Col>
                            <Col xs={3}>

                            </Col>
                            <Col xs={3}>
                                <ButtonToolbar>
                                    <ButtonGroup bsSize="small">
                                        <Button onClick={this.handleLike}> <Glyphicon glyph="thumbs-up" /> Like</Button>
                                        <Button onClick={this.handleunLike}> <Glyphicon glyph="thumbs-down" /> Unlike</Button>

                                    </ButtonGroup>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pull-left smPush" smPush={1}>
                                <p>{this.props.createdDate}</p>
                            </Col>
                        </Row>
                    </Panel.Footer>


                </Panel>



            );
        }
    }
}


export default ImageCard;