import React, { Component } from 'react';
import APIService from '../../../utils/api/APIService';
import { ListGroup, ListGroupItem, Row, Col, Button, Glyphicon, Grid, Image, Well, Panel } from 'react-bootstrap';
import LoaderButton from '../../others/LoaderButton';
import FollowModal from './popupwidowforfollow';
import defaultimage from '../UserInfo/default-image.jpg';
import "./Follow.css";
const style = {
    padding: "0px"
}

export default class FollowCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            follows: [],
            addFollowModalShow: false

        };
    }
    async componentDidMount() {
        await this.fetchdata();

    }

    async fetchdata() {
        this.setState({ isLoading: true });
        try {
            let cli = new APIService();
            await cli.getFollowerList().then(res => {
                this.setState({ follows: res });
            });
            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }
    async handleUnFollow(event, userId) {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {
            let cli = new APIService();
            await cli.unFollow(userId);
            this.setState({ isLoading: false });
            await this.fetchdata();
        } catch (error) {
            this.setState({ isLoading: false });
        }


    }
    renderfollowers() {
        const tmpfollows = this.state.follows;


        return (


            tmpfollows.length > 0 ?


                <Row>
                    <Col >


                        {this.state.follows.map((val, index) => (


                            <Well key={val.userId} >
                                <Grid >
                                    <Row > 
                                        <Col lg={1} sm={1} md={1} xs={1}><Image src={!!val.profilePicture ? val.profilePicture : defaultimage} responsive circle >
                                        </Image></Col>
                                        <Col lg={1} sm={1} md={1} xs={1}>

                                            <Grid>
                                                <Row>
                                                    <Col lg={1} sm={1} md={1} xs={1}> <h4>
                                                        {val.userName}

                                                    </h4></Col>

                                                </Row>

                                                <Row>
                                                    <Col lg={1} sm={1} md={1} xs={1}>
                                                        <small>

                                                            <LoaderButton
                                                                block
                                                                bsSize="xsmall"
                                                                type="button"
                                                                key={val.userId}
                                                                isLoading={this.state.isLoading}
                                                                onClick={(event) => this.handleUnFollow(event, val.userId)}
                                                                text="un-follow"
                                                                loadingText="unfollowing up…"
                                                            ></LoaderButton>

                                                        </small></Col>
                                                </Row>
                                            </Grid>



                                        </Col>
                                    </Row>
                                </Grid>


                            </Well >

                        ))}


                    </Col>
                </Row>

                :
                <Row className="gridcontainer">
                    <Col>
                        <ListGroup>
                            <ListGroupItem header="Not Following ">0</ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
        )
    }
    renderForm() {
        let modalfollowClose = () => {
            this.setState({ addFollowModalShow: false });
            this.fetchdata()
        };
        return (
            <Row>
                <Col className="gridcontainer">
                <Button onClick={() => this.setState({ addFollowModalShow: true })}> <Glyphicon glyph="glyphicon glyphicon-tag"> Follow</Glyphicon></Button>
                <FollowModal show={this.state.addFollowModalShow}
                    onHide={modalfollowClose} />
                    </Col>
            </Row>


        );
    }
    render() {
        return (


            <Row>
                <Col>
                <Panel>
                    <Panel.Heading>Followers</Panel.Heading>
                    <Panel.Body>
                        <Grid className="gridcontainer">
                            {this.renderForm()}
                        </Grid>
                    </Panel.Body>
                    <Panel.Body>
                        <Grid className="gridcontainer">
                            {this.renderfollowers()}
                        </Grid>
                    </Panel.Body>
                </Panel>
                </Col>
            </Row>

        );
    }
}
