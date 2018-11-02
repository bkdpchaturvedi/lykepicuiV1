import React, { Component } from "react";

import "./Home.css";



export default class Home extends Component {

//   constructor(props) {
//     super(props);

    
// //    console.log(props);

//   }


  renderLander() {
     var dirtyUserName = "<img src=x/ onerror=alert(localStorage.access_token)>"
     var bugStr = "{\"__html\":\"<div className=Home><div className=lander><h1>Lyke Pic App </h1> "+dirtyUserName+"<p>A simple Pic Like App </p></div></div>\"}"
     var attacker_props = JSON.parse(bugStr)
    return (
        <div dangerouslySetInnerHTML= {attacker_props}/>

    );
  }
 
 

  render() {
 
    return (
      <div className="Home">
        {this.renderLander()}
      </div>
    );
  }
}