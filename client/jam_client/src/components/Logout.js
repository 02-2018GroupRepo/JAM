import React, { Component } from 'react';
import { Glyphicon, Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";

class Logout extends Component{
	constructor(){
		super();
		this.logout = this.logout.bind(this);
	}

	logout(){
		// event.preventDefault();
		// console.log("YO");
		localStorage.clear();
	}

	render(){
		return(
			<Nav pullRight>
				<Navbar.Link href="/" id="logout" onClick={this.logout} className="navbar-brand">
					<Glyphicon glyph="log-out"/> Logout
				</Navbar.Link>
			</Nav>
		)
	}
}

export default Logout;
