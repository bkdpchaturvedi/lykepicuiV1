import React, { Component } from "react";
import { ButtonGroup, Button, Glyphicon, ListGroup, Grid, Row, Col } from "react-bootstrap";
import {
  Card,

  CardBody,
  CardSubtitle,
  CardImg,
  CardTitle,
  CardLink,
  CardText,
} from 'reactstrap';
import "./Home.css";
import InfiniteScroll from 'react-infinite-scroller';
import APIService from "../../utils/api/APIService";
import UserCard from "../member/UserInfo/UserInfo";
import MyVerticallyCenteredModal from "../member/Post/PopupWindow";
import FollowCard from "../member/Followers/Follows";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

export default class Home extends Component {

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

      <hr />
      <InfiniteScroll
       pageStart={0}
       loadMore={this.fetchMorePosts}
       hasMore={true}
       loader={<div className="loader">Loading ...</div>}
       useWindow={false}
      >
        {posts.map((i, post) => (
            <div>
            <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
          <CardText>
            <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </CardBody>
      </Card>
          </div>


          
        ))}
      </InfiniteScroll>
    </div>);
  }
  renderPosts(modalClose) {
   
    return (
      <Grid  >
        <Row>
          <Col sm={4} md={3} lg={2}>
            <Grid fluid>
              <UserCard userdata={this.state.userinfo} />
              <FollowCard ></FollowCard>

            </Grid>

          </Col>
          <Col sm={8} md={9} lg={10}>
            <Grid fluid>
              <Row>

                <Col md={3} lg={2}>
                  <Button  onClick={() => this.setState({ addPostModalShow: true })}>
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
    );
  }

 fetchMorePosts = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 }))
    //   });
    // }, 1500);
  this.setState({isLoading:true});
    const cli = new APIService();
    try {
      await cli.getUserFeed().then(res => {
        this.setState({
          posts: res
        });
        this.setState({isLoading:false});
      });
    } catch (error) {
      this.setState({isLoading:true});
    }
    console.log(this.state.posts);

  };

  render() {
    console.log(this.state.posts)
    let modalClose = () => this.setState({ addPostModalShow: false });
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderPosts(modalClose) : this.renderLander()}
      </div>
    );
  }
}