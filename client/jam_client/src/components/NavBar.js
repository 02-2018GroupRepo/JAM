import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Logout from './Logout';
import{Navbar, Nav} from 'react-bootstrap';
class NavBar extends Component{



	render(){
		const userName = localStorage.user;
		const loggedIn= localStorage.token;
			// console.log(userEmail)
		return(
			<Navbar inverse collapseOnSelect>
			  <Navbar.Header>
			    <Navbar.Brand>
			    { loggedIn == undefined
			    	?
					<Navbar.Link href="/" className="navbar-brand navLogo" pullRight>JAM</Navbar.Link>
			    	:
			    	<Navbar.Link href="/jobs" className="navbar-brand" pullRight>Welcome {userName}!</Navbar.Link>
			    }
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			  	{ loggedIn == undefined
			  		?
			  		<span></span>
			  		:
			  		<Nav pullRight>
			  			<Logout />
			  		</Nav>
			  	}
			  </Navbar.Collapse>
			</Navbar>			
		)
	}
}

export default NavBar;
