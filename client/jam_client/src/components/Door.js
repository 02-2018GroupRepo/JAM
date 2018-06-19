import React, {Component} from 'react';
import axios from 'axios';
import url from '../url';
import {FormGroup, ControlLabel, FormControl, NumericInput, Button} from 'react-bootstrap';
import swal from 'sweetalert';

class Door extends Component{
	constructor(){
		super();
		this.state={
			job_id: "",
			doors: {}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		this.setState={
			job_id: this.props.job_id
		}
		document.getElementById('door_quantity').setAttribute("value", "1");
		document.getElementById('door_hinges').setAttribute("value", "2");
		document.getElementById('door_screws').setAttribute("value", "8");
		document.getElementById('door_height').setAttribute("value", "80");
		document.getElementById('door_width').setAttribute("value", "36");
	}

	handleQuantity(){
		let quantity = document.getElementById('door_quantity');
		let hinges = document.getElementById('door_hinges');
		let screws = document.getElementById('door_screws');
		const numHinges = (quantity.value * 2);
		hinges.setAttribute("value", numHinges);
		const numScrews = (numHinges * 4);
		screws.setAttribute("value", numScrews)
	}

	handleSubmit(event){
		event.preventDefault();
		const type = document.getElementById('door_type').value
		// console.log(type)
		const color = document.getElementById('door_color').value
		// console.log(color)
		const height = document.getElementById('door_height').value
		// console.log(height)
		const width = document.getElementById('door_width').value
		// console.log(width)
		const quantity = document.getElementById('door_quantity').value
		// console.log(quantity)
		const hinges = document.getElementById('door_hinges').value
		// console.log(hinges)
		const screws = document.getElementById('door_screws').value
		// console.log(screws)
		// console.log(job_id)
		const job = this.props.job_id
		// console.log(job);

		const doorCreate = axios({
			method: "POST",
			url: url.url + "door/create",
			data: {
				job,
				type,
				color,
				height,
				width,
				quantity,
				hinges,
				screws
			}

		})
		
		doorCreate.then(data =>{
			// console.log(data)
			this.props.updateDoor(data);
			swal("Door has been added!", {
					icon: "success",
			});
			// console.log(data)
		})

	}

	render(){

		// console.log(this.state.job_id)

		return(
			<div className="container">
				<div className="modal-body row">
			        <form onSubmit={this.handleSubmit}>
			        	<div className="col-md-6">
							<FormGroup controlId="formControlsSelect">
						    	<ControlLabel>Door Type</ControlLabel>
						      	<FormControl componentClass="select" placeholder="Door Type" id="door_type" bsSize="large">
						        	<option value="Fiber Glass">Fiber Glass</option>
						        	<option value="Wood">Wood</option>
						        	<option value="Steel">Steel</option>
						      	</FormControl>
						    </FormGroup>


						    <div className="modal-body row">
						    	<div className="col-md-4">
						      		<FormGroup bsSize="large">
								      	<ControlLabel>Color</ControlLabel>
		    							<FormControl componentClass="select" placeholder="Color" id="door_color">
		    								<option value="Black">Black</option>
		    								<option value="White">White</option>
		    								<option value="Blue">Blue</option>
		    								<option value="Silver">Silver</option>
								      	</FormControl>
  									</FormGroup>
  								</div>
  								<div className="col-md-4">
	  								<FormGroup bsSize="large">
							      		<ControlLabel>Height (in.)</ControlLabel>
	    								<FormControl type="number" step="0.1" placeholder="0" id="door_height" min="0" />
	  								</FormGroup>
	  							</div>
	  							<div className="col-md-4">
	  								<FormGroup bsSize="large">
							      		<ControlLabel>Width (in.)</ControlLabel>
	    								<FormControl type="number" step="0.1" placeholder="0" id="door_width" min="0" />
	  								</FormGroup>
	  							</div>
	  						</div>
						    
						    <div className="modal-body row">

  								<div className="col-md-4">
	  								<FormGroup bsSize="large">
							      		<ControlLabel>Hinges</ControlLabel>
	    								<FormControl type="number" placeholder="2" id="door_hinges" min="2" />
	  								</FormGroup>
	  							</div>
	  							<div className="col-md-4">
	  								<FormGroup bsSize="large">
							      		<ControlLabel>Screws</ControlLabel>
	    								<FormControl type="number" placeholder="8" id="door_screws" min="8" />
	  								</FormGroup>
	  							</div>
  							</div>
						</div>
			    		<div className="col-md-6">
			    			<div className="col-md-3">
			      				<FormGroup bsSize="large">
			      					<ControlLabel>Quantity</ControlLabel>
									<FormControl type="number" placeholder="1" id="door_quantity" min="1" onChange={this.handleQuantity} />
								</FormGroup>
								<Button type="submit" bsStyle="primary">Submit</Button>
							</div>
						</div>
				    </form>
				</div>
			</div>
		)
	}
}

export default Door;