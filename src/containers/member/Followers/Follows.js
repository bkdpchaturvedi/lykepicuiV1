import React, { Component } from 'react';
import APIService from '../../../utils/api/APIService';
import {ListGroup,ListGroupItem,Row,Col,Button,Glyphicon} from 'react-bootstrap';
import LoaderButton from '../../others/LoaderButton';
import FollowModal from './popupwidowforfollow';


export default class FollowCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            follows: [],
            addFollowModalShow:false

        };
    }
    async componentDidMount(){
           await this.fetchdata();

    }

    async fetchdata(){
        this.setState({isLoading:true});
        try {
            let cli=APIService();
            await cli.getFollowerList().then(res=> {
                this.setState({follows:res});
            });
            this.setState({isLoading:false});
        } catch (error) {
            this.setState({isLoading:false});
        }
    }
    async handleUnFollow(userId){
        this.setState({isLoading:true});
        try {
            let cli= new APIService();
            await cli.unFollow(userId);
            this.setState({isLoading:false});
            await this.fetchdata();
        } catch (error) {
            this.setState({isLoading:false});
        }


    }
    renderfollowers() {
        const tmpfollows=this.state.follows;


        return (
          
            
            tmpfollows.length>0?
            
            <Row>
                <Col>
                <ListGroup>
                    
                   { tmpfollows.map((val, index) => (
                        <ListGroupItem header={val.userName}><LoaderButton 
                        block
                        bsSize="small"
                        type="button"
                        isLoading={this.state.isLoading}
                        onClick={this.handleUnFollow(val.userId)}
                        text="un-follow"
                        loadingText="unfollowing up…"
                        ></LoaderButton>
                        </ListGroupItem>))}

                    
                    
                    
                </ListGroup>
                </Col>
            </Row>

            :
            <Row>
                <Col>
                <ListGroup>
                <ListGroupItem header="Not Following ">0</ListGroupItem>
                </ListGroup>
                </Col>
            </Row>
        )
    }
    renderForm(){
        let modalfollowClose = () => {this.setState({ addFollowModalShow: false });
        this.fetchdata()};
        return (
            <Row>
                 <Button onClick={() => this.setState({ addFollowModalShow: true })}> <Glyphicon glyph="glyphicon glyphicon-tag"> Follow</Glyphicon></Button>
                 <FollowModal show={this.state.addFollowModalShow}
                        onHide={modalfollowClose} />      
            </Row>
            

        );
    }
    render(){
        return(
            <Row>
                {this.renderForm()}
                {this.renderfollowers()}
            </Row>

        );
    }
}
