import React, { Component } from "react";

import "./Home.css";



export default class Home extends Component {

//   constructor(props) {
//     super(props);


// //    console.log(props);

//   }


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



    render() {

        return (
            <div className="Home">
                {this.renderLander()}
            </div>
        );
    }
}