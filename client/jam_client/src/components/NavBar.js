import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Logout from './Logout';

class NavBar extends Component{



	render(){

		const loggedIn= localStorage.token;
		return(
			<div>
				<nav className="navbar navbar-inverse myNavBar">
					<div className="container-fluid">
						<div className="navbar-header">
							{loggedIn == undefined
								?
								<Link to="/" className="navbar-brand navLogo">JAM</Link>
								:
								<Logout />
							}
						</div>
					</div>
				</nav>
			</div>
			)
	}
}

export default NavBar;
