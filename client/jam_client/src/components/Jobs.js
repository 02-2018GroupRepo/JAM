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
			user:"",
			token: localStorage.getItem('token')
		}
		this.handleJob = this.handleJob.bind(this);
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
				jobs: jobData.data,
				user : jobData.data[0].user
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

	handleJob(event){
		event.preventDefault();
		const first_name = document.getElementById("fname").value;
		const last_name = document.getElementById("lname").value;
		const address = document.getElementById("address").value;
		const phone = document.getElementById("phone").value;
		const email = document.getElementById("email").value;
		const time = document.getElementById("date").value.toString();
		const description = document.getElementById("description").value;
		const user = this.state.user;

		console.log(this.state.customer);
		const jobRequest = axios({
			method:"POST",
			url: url.url + "create/customer",
			data:{
				first_name,
				last_name,
				address,
				phone,
				email
			}
			
		})
		jobRequest.then((newJobData)=>{
				console.log(newJobData);
			axios({
				method:"POST",
				url:url.url+ "create/job",
				data:{
					customer_id:newJobData.id,
					user:this.state.user
				}
			})

			})
	}



	render(){
		// col-lg-2 col-md-2 col-xl-12 col-sm-4 
		const jobs = this.state.jobs.map((data, index)=>{
			if(data != undefined){
				const customer = data.customer
				// console.log(customer.id)
				return(
					<li className="col-md-3">
						<Link to={`/job/${data.id}`}  >
							<div id="jumboJob" className="jumbotron">
								<h3 className="jumboTitle"> Job# {data.id} </h3>
								<hr />
								{customer != undefined
									?
									<span className="jumboText">
										<h5>Customer: {customer.last_name}, {customer.first_name}</h5>
										<h5>Address: {customer.address}</h5>
										<h5>Phone: {customer.phone}</h5>
										<h5>Email: {customer.email}</h5>
										<h5>{this.formatTime(data.time)} </h5>
										<h5> Description: {data.description} </h5>
									</span>
									:
									<span></span>
								}
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
					<form onSubmit={this.handleJob}>
					  <div class="form-group">
					    <label for="first_name">Customer First Name:</label>
					    <input type="text" class="form-control" id="fname"/>
					  </div>
					  <div class="form-group">
					    <label for="last_name">Customer Last Name:</label>
					    <input type="text" class="form-control" id="lname"/>
					  </div>
					   <div class="form-group">
					    <label for="email">Customer Email:</label>
					    <input type="email" class="form-control" id="email"/>
					  </div>
					   <div class="form-group">
					    <label for="address">Address:</label>
					    <input type="text" class="form-control" id="address"/>
					  </div>
					  <div class="form-group">
					    <label for="phone">Phone:</label>
					    <input type="text" class="form-control" id="phone"/>
					  </div>
					  <div class="form-group">
					    <label for="description">Description:</label>
					    <input type="text" class="form-control" id="description"/>
					  </div>
					  <div class="form-group">
					    <label for="date">Date:</label>
					    <input type="datetime-local" class="form-control" id="date"/>
					  </div>
					  
					  <button type="submit" class="btn btn-default">Submit</button>
				</form>
			
				
			</div>
			
		)
	}
} 

export default Jobs;