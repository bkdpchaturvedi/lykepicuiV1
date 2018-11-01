import React, { Component } from 'react'
import {  Button, Glyphicon,  Grid, Row, Col } from "react-bootstrap";

import "./UserFeed.css";
// import APIService from "../../utils/api/APIService";
import UserCard from "../UserInfo/UserInfo";
import MyVerticallyCenteredModal from "../Post/PopupWindow";
 import FollowCard from "../Followers/Follows";
import APIService from '../../../utils/api/APIService';
import ImageCard from './imageCard';


// const style = {
//     height: 30,
//     border: "1px solid green",
//     margin: 6,
//     padding: 8
// };

export default class UserFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            posts: [],
            userinfo: null,
          
          };

    }

    async componentDidMount() {
        const cli = new APIService();
        try {
            await cli.getProfile().then(res => {
                this.setState({
                    userinfo: res
                });
            });
          await  this.fetchMorePosts();
        } catch (error) {

        }


    }

    renderLander() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>Lyke Pic App </h1>
                    <p>A simple Pic Like App</p>
                </div>
            </div>
        );
    }
    renderPostsList(posts) {
        return (<div>
                {posts.map((val,index)=>(
                       <ImageCard picture={val.picture} key={val.postId}
                       description={val.description} 
                       userId={val.userId}
                       createdon={val.createdDate}
                       ></ImageCard> 

                ))}
            <hr />

           
        </div>);
    }
    renderPosts(modalClose) {
        if(this.state.isLoading){ return(<div className="Loader" >
            <Glyphicon glyph="refresh" className="spinning " bsSize="large"/>

        </div>)} else{
        return (
            <Grid  >
                <Row>
                    <Col sm={4} md={5} lg={4}>
                        <Grid fluid>
                            <UserCard userdata={this.state.userinfo} />
                            <FollowCard ></FollowCard>

                        </Grid>

                    </Col>
                    <Col sm={8} md={7} lg={8}>
                        <Grid fluid>
                            <Row>

                                <Col md={3} lg={2}>
                                    <Button onClick={() => this.setState({ addPostModalShow: true })}>
                                        <Glyphicon glyph="glyphicon glyphicon-picture glyphicon glyphicon-share"> Post</Glyphicon></Button>
                                </Col>
                                <Col md={6} lg={8}> </Col>
                                <Col md={3} lg={2}>

                                    <Button > <Glyphicon glyph="glyphicon glyphicon-tag"> Follow</Glyphicon></Button>
                                </Col>

                            </Row>
                            <hr />
                            <Row>

                                <div className="posts">


                                    {!this.state.isLoading && this.renderPostsList(this.state.posts)}

                                </div>
                            </Row>
                        </Grid>
                    </Col>
                </Row>
                <Row>
                    <MyVerticallyCenteredModal
                        show={this.state.addPostModalShow}
                        onHide={modalClose}
                    />
                </Row>
            </Grid>
        );}
    }

    fetchMorePosts = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        // setTimeout(() => {
        //   this.setState({
        //     items: this.state.items.concat(Array.from({ length: 20 }))
        //   });
        // }, 1500);
        this.setState({ isLoading: true });
        let cli = new APIService();
        try {
            await cli.getUserFeed().then(res => {
                this.setState({
                    posts: res
                });
                
            });
            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: true });
        }
//        console.log(this.state.posts);

    };

    render() {
        //console.log(this.state.posts)
        let modalClose = () => {this.setState({ addPostModalShow: false });
        this.fetchMorePosts()};
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderPosts(modalClose) : this.renderLander()}
            </div>
        );
    }
}
