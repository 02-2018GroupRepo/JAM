import React, {Component} from 'react';
import axios from 'axios';
import url from '../url';
import {Link} from 'react-router-dom';
import SingleJob from './SingleJob';

class Jobs extends Component{
	constructor(){
		super();
		this.state={
			jobs: [""],
			token: localStorage.getItem('token')
		}
	}

	componentDidMount(){
		const getToken = axios({
			method: "POST",
			url: url.url + "jobs",
			data:{
				token: this.state.token
			}
		});
		getToken.then((jobData)=>{
			// setTimeout(300);
			// debugger
			// console.log(jobData)
			 // console.log("are there jobss",jobData.data);
			 // console.log(jobData.data[0].customer.id)
			this.setState({
				jobs: jobData.data
			})
		})
	}

	formatTime(time){
		// console.log(time)
		let date = new Date(time);
		let dateTime = (date.toString().split(" GMT")[0].slice(0, -3))
		return(
			<div>
			{dateTime}
			</div>
		)
	}



	render(){
		// col-lg-2 col-md-2 col-xl-12 col-sm-4 
		const jobs = this.state.jobs.map((data, index)=>{
			if(data != undefined){
				const customer = data.customer
				console.log(customer)
				return(
					<li className="col-md-4">
						<Link to={`/job/${data.id}`}  >
							<div id="jumboJob" className="jumbotron">
								<h3> Job# {data.id} </h3>
								<hr />
								<h4>Customer: </h4>
								<h4>{this.formatTime(data.time)} </h4>
								<h4> Description: {data.description} </h4>
							</div>
						</Link>
					</li>
				)
			}
		})
		
		return(
			<div className="container2 main-jobs">
				<div className="jobs-list">
					<ul className="row">
						{jobs}
					</ul>
				</div>
			</div>
		)
	}
} 

export default Jobs;