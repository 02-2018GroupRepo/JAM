import React, {Component} from 'react';
import axios from 'axios';
import url from '../url';
import {Table, Button} from 'react-bootstrap';
import WindowEdit from './WindowEdit';
import DoorEdit from './DoorEdit';
import CabinetEdit from './CabinetEdit';
import swal from 'sweetalert';


class Review extends Component{
	constructor(){
		super();
		this.state={
		}
		this.getProducts = this.getProducts.bind(this);
		this.submitJob = this.submitJob.bind(this);
 	}

 	deleteWindow(data){
 		//debugger
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this record!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {

				const deleted = axios({
		 			method: "POST",
		 			url: url.url +"delete/window",
		 			data:{
		 				job: data.job,
		 				id: data.id,
		 			}
				}).then(data=>{

		 			this.props.updateWindow(data);
		 		})

				swal("Your window has been deleted!", {
					icon: "success",
			});
		} else {
			swal("Your window is safe!");
			}
		});
 		// console.log(data.id)
 		// const window_id = data.id

 	}


 	submitJob(job){
 		// console.log(job)
 		// console.log(job.user)

 		swal({
			title: "Submit Job",
			text: "Are you sure?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willSubmit) => {
			if (willSubmit) {
				const completeJob = axios({
	 				method: "POST",
	 				url: url.url + "completed",
	 				data:{
	 					id: job.id,
	 					user: job.user
	 				}
	 			}).then(data=>{
	 			// console.log(data);
					swal(`The job has been submitted \n` + `Copy sent to: ${job.user.email}`, {
						icon: "success",
					});
	 				this.props.history.push('/jobs');
	 			})
		} else {
			swal("The job has not been submitted");
			}
		})


 	}


	deleteCabinet(data){

		 swal({
 			title: "Are you sure?",
 			text: "Once deleted, you will not be able to recover this record!",
 			icon: "warning",
 			buttons: true,
 			dangerMode: true,
 		})
		 .then((willDelete) => {
			if (willDelete) {

		 		const deleted = axios({
		 			method: "POST",
		 			url: url.url +"delete/cabinet",
		 			data:{
		 				job: data.job,
		 				id: data.id
		 			}
		 		}).then(data=>{
		 			this.props.updateCabinet(data);
		 		})

				swal("Your cabinet has been deleted!", {
					icon: "success",
				});
			} 
			else {
					swal("Your cabinet is safe!");
			}
		});
 	}

 	 deleteDoor(data){
			swal({
  			title: "Are you sure?",
  			text: "Once deleted, you will not be able to recover this record!",
  			icon: "warning",
  			buttons: true,
  			dangerMode: true,
  		})
 		.then((willDelete) => {
 			if (willDelete) {

	 			const deleted = axios({	
	 				method: "POST",
	 				url: url.url +"delete/door",
	 				data:{
	 					job: data.job,
	 					id: data.id
	 				}
	 			}).then(data=>{	
	 				this.props.updateDoor(data);
	 			})
				swal("Your door has been deleted!", {
					icon: "success",
				});
			} 
			else {
					swal("Your door is safe!");
			}
		});
 	}



 	getProducts(){
 		 // console.log(this.props.cabinet.data)
 		 let cabinets
 		 let doors
 		 let windows
 		if(this.props.cabinet.data != undefined){
 			// console.log("Yoo")
 			// console.log(this.props.cabinet.data.CabinetCreatedSuccessfully)
 			cabinets = this.props.cabinet.data.CabinetCreatedSuccessfully.map((data, index)=>{
			// console.log(this.props.cabinet.data.CabinetCreatedSuccessfully) 		
 			// console.log(index);

 			// console.log(data.color)

 				return(
					<tr key = {index} className='cabinetList'>
						<td>{data.type}</td>
						<td>{data.color}</td>
						<td>{data.height}</td>
						<td>{data.width}</td>
						<td>{data.quantity}</td>
						<td>{data.hinges}</td>
						<td>{data.screws}</td>
						<td>
							<CabinetEdit index={index} cabinet={data} updateCabinet={this.props.updateCabinet}/>
       					</td>
          				<td>
	       					<span className="glyphicon glyphicon-trash" id="trash" id='trash' onClick={()=>{this.deleteCabinet(data)}}></span>
	       				</td>	
					</tr>
 				)

 			});
 		}

 		if(this.props.door.data != undefined){
 			// console.log("YO")
 			doors = this.props.door.data.DoorCreatedSuccessfully.map((data, index)=>{
	 			return(
	 				<tr key = {index} className='doorList'>
						<td>{data.type}</td>
						<td>{data.color}</td>
						<td>{data.height}</td>
						<td>{data.width}</td>
						<td>{data.quantity}</td>
						<td>{data.hinges}</td>
						<td>{data.screws}</td>
						<td>
							<DoorEdit index={index} door={data} updateDoor={this.props.updateDoor} />
	       				</td>
	       				<td>
	       					<span className="glyphicon glyphicon-trash" id="trash" id='trash' onClick={()=>{this.deleteDoor(data)}}></span>
	       				</td>	
					</tr>
	 			)
 			})

 		}

 		if(this.props.window.data != undefined){
 			// this.handleWindowEdit()
 			windows = this.props.window.data.WindowCreatedSuccessfully.map((data, index)=>{

 				// console.log(index)
 				return(

	 				<tr key = {index} className='windowList'>
						<td>{data.type}</td>
						<td>{data.color}</td>
						<td>{data.height}</td>
						<td>{data.width}</td>
						<td>{data.quantity}</td>
						<td>
							<WindowEdit index={index} window={data} updateWindow={this.props.updateWindow} />
       					</td>
            			<td>
	       					<span className="glyphicon glyphicon-trash" id='trash' onClick={()=> {this.deleteWindow(data)}}></span>
	       				</td>		
					</tr>
 				)
 			})
 		}
 		// console.log(cabinets)
 		return(
 			<div>
 				<Button type="submit" id="submit-job" bsStyle="primary" onClick={()=> {this.submitJob(this.props.job)}}>Submit Job</Button>
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

  // 	handleWindowEdit(){
  // 		let edit = document.getElementsByClassName('edit-btn');
  // 		// console.log("YOYOYO")
  // 		for(let i=0; i < edit.length; i++){
		// 	edit[i].addEventListener('click', function(){

		// 	})
		// }
  // 		// event.preventDefault();
  // 		// document.getElementsBy('')

  // 	}
	
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

	render(){

		// console.log(this.state.cabinets)
		// let cabinets = ""

		// if(this.props.cabinet.length > 0){
		// 	cabinets = this.props.cabinet.data.CabinetCreatedSuccessfully.map((data, index)=>{
		// 			<h2> Type: {data.type} </h2> 
		// 	})
		// }

		// if (this.props.cabinet.data == undefined){
		// 	console.log(this.props.cabinet.length == 0 && this.props.window.length == 0 && this.props.door.length == 0)
		// }
		// else {
		// 	console.log(this.props.cabinet.data.CabinetCreatedSuccessfully[0].type)
		// }

		return(
			<div className="container">
				{ this.props.cabinet.length == 0 && this.props.window.length == 0 && this.props.door.length == 0
					?
					<h1>Nothing to review</h1>
					:
					<div className="container">
						{this.getProducts()}
					</div>
				}
				
			</div>
		)
	}
}

export default Review;