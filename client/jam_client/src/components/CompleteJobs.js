import React, {Component} from 'react';
import axios from 'axios';
import url from '../url';
import {Table} from 'react-bootstrap';


class CompleteJobs extends Component{
	constructor(){
		super();
		this.state={
			token: localStorage.getItem('token'),
			windows: [],
			doors: [],
			cabinets: [],
			job: {},
			customer:{},
			user: {}
		}

		this.assignJob = this.assignJob.bind(this);
		this.getProducts = this.getProducts.bind(this);
	}

	componentDidMount(){
		const getJob = axios({
			method: "POST",
			url: url.url + "complete/job",
			data:{
				id: this.props.match.params.job_id
			}
		}).then((data)=>{
			// console.log({data})
			this.setState({
				windows: data.data.windows,
				doors: data.data.doors,
				cabinets: data.data.cabinets			
			})
		})
	}

	assignJob(){
		if(this.state.windows.length !== 0){
			this.setState({
				job: this.state.windows[0].job,
				customer: this.state.windows[0].job.customer,
				user: this.state.windows[0].job.user
			})
		} else if (this.state.doors.length !== 0){
			this.setState({
				job: this.state.doors[0].job,
				customer: this.state.doors[0].job.customer,
				user: this.state.doors[0].job.user
			})
		} else if (this.state.cabinets.length !== 0) {
			this.setState({
				job: this.state.cabinets[0].job,
				customer: this.state.cabinets[0].job.customer,
				user: this.state.cabinets[0].job.user
			})
		}
	}

	windowHeaders(){
		return(
		<tr>
			<th className='text-center' width='200'>Type</th>
			<th className='text-center' width='200'>Color</th>
			<th className='text-center' width='200'>Height</th>
			<th className='text-center' width='200'>Width</th>
			<th className='text-center' width='200'>Quantity</th>
		</tr>
		)
	}


	cabinetHeaders(){
		return(
		<tr>
			<th className='text-center' width='200'>Type</th>
			<th className='text-center' width='200'>Color</th>
			<th className='text-center' width='200'>Height</th>
			<th className='text-center' width='200'>Width</th>
			<th className='text-center' width='200'>Quantity</th>
			<th className='text-center' width='200'>Hinges</th>
			<th className='text-center' width='200'>Screws</th>
		</tr>
		)
	}




	getProducts(){
 		 // console.log(this.props.cabinet.data)
 		 let cabinets
 		 let doors
 		 let windows
 		if(this.state.cabinets.length !== 0){
 			// console.log("Yoo")
 			// console.log(this.props.cabinet.data.CabinetCreatedSuccessfully)
 			cabinets = this.state.cabinets.map((data, index)=>{

 				return(
					<tr key = {index} className='cabinetList'>
						<td>{data.type}</td>
						<td>{data.color}</td>
						<td>{data.height}</td>
						<td>{data.width}</td>
						<td>{data.quantity}</td>
						<td>{data.hinges}</td>
						<td>{data.screws}</td>	
					</tr>
 				)

 			});
 		}

 		if(this.state.doors.length !== 0){
 			// console.log("YO")
 			doors = this.state.doors.map((data, index)=>{
	 			return(
	 				<tr key = {index} className='doorList'>
						<td>{data.type}</td>
						<td>{data.color}</td>
						<td>{data.height}</td>
						<td>{data.width}</td>
						<td>{data.quantity}</td>
						<td>{data.hinges}</td>
						<td>{data.screws}</td>
					</tr>
	 			)
 			})

 		}

 		if(this.state.windows.length !== 0){
 			// this.handleWindowEdit()
 			windows = this.state.windows.map((data, index)=>{

 				// console.log(index)
 				return(

	 				<tr key = {index} className='windowList'>
						<td>{data.type}</td>
						<td>{data.color}</td>
						<td>{data.height}</td>
						<td>{data.width}</td>
						<td>{data.quantity}</td>
					</tr>
 				)
 			})
 		}
 		// console.log(cabinets)
 		return(
 			<div>
 				{cabinets != undefined
 					?
 					<div>
	 					<h3> Cabinets </h3>
	 					<Table>
	 						<thead>
	 							{this.cabinetHeaders()}
	 						</thead>
	 						<tbody>
	 							{cabinets}
	 						</tbody>
	 					</Table>
	 				</div>
	 				:
	 				<span></span>
	 			}
	 			{doors != undefined
 					?
 					<div>
	 					<h3> Doors </h3>
	 					<Table>
	 						<thead>
	 							{this.cabinetHeaders()}
	 						</thead>
	 						<tbody>
	 							{doors}
	 						</tbody>
	 					</Table>
	 				</div>
	 				:
	 				<span></span>
	 			}
	 			{windows != undefined
 					?
 					<div>
	 					<h3> Windows </h3>
	 					<Table>
	 						<thead>
	 							{this.windowHeaders()}
	 						</thead>
	 						<tbody>
	 							{windows}
	 						</tbody>
	 					</Table>
	 				</div>
	 				:
	 				<span></span>
	 			}
 			</div>
 		)
  	}

	render(){
		if(Object.keys(this.state.job).length === 0){
			this.assignJob()
		}

		return(
			<div className="container">
				{this.getProducts()}
			</div>
		)
	}

}

export default CompleteJobs