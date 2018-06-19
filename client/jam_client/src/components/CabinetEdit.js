import React, {Component} from 'react';
import axios from 'axios';
import url from '../url';
import {FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap';
import swal from 'sweetalert';

class CabinetEdit extends Component{

	constructor(){
		super();
		this.state={
			cabinet: {},
			job: {}
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	// componentWillReceiveNewProps(newProps){
	// 	console.log(newProps)
	// 	document.getElementById(`cabinetType${newProps.index}`).setAttribute("value", newProps.cabinet.type)
	// 	document.getElementById(`cabinetColor${newProps.index}`).setAttribute("value", newProps.cabinet.color)
	// 	document.getElementById(`cabinetHeight${newProps.index}`).setAttribute("value", newProps.cabinet.height)
	// 	document.getElementById(`cabinetWidth${newProps.index}`).setAttribute("value", newProps.cabinet.width)
	// 	document.getElementById(`cabinetQuantity${newProps.index}`).setAttribute("value", newProps.cabinet.quantity)
	// 	document.getElementById(`cabinetHinges${newProps.index}`).setAttribute("value", newProps.cabinet.hinges)
	// 	document.getElementById(`cabinetScrews${newProps.index}`).setAttribute("value", newProps.cabinet.screws)
	// }





	componentDidMount(){
		// console.log(this.props.cabinet)
		this.setState({
			cabinet: this.props.cabinet,
			job: this.props.cabinet.job,
		})
		// console.log(this.props.index)
		document.getElementById(`cabinetType${this.props.index}`).setAttribute("value", this.props.cabinet.type)
		document.getElementById(`cabinetColor${this.props.index}`).setAttribute("value", this.props.cabinet.color)
		document.getElementById(`cabinetHeight${this.props.index}`).setAttribute("value", this.props.cabinet.height)
		document.getElementById(`cabinetWidth${this.props.index}`).setAttribute("value", this.props.cabinet.width)
		document.getElementById(`cabinetQuantity${this.props.index}`).setAttribute("value", this.props.cabinet.quantity)
		document.getElementById(`cabinetHinges${this.props.index}`).setAttribute("value", this.props.cabinet.hinges)
		document.getElementById(`cabinetScrews${this.props.index}`).setAttribute("value", this.props.cabinet.screws)
	}

	handleSubmit(event){
		event.preventDefault();
		// console.log(this.props.index)
		const customer = this.state.job.customer
		const job = this.state.job;
		const id = this.state.cabinet.id
		const type = document.getElementById(`cabinetType${this.props.index}`).value;
		const color = document.getElementById(`cabinetColor${this.props.index}`).value;
		const height = document.getElementById(`cabinetHeight${this.props.index}`).value;
		const width = document.getElementById(`cabinetWidth${this.props.index}`).value;
		const quantity = document.getElementById(`cabinetQuantity${this.props.index}`).value;
		const hinges = document.getElementById(`cabinetHinges${this.props.index}`).value;
		const screws = document.getElementById(`cabinetScrews${this.props.index}`).value;
		// debugger
		// console.log()

		swal({
			title: "Edit Cabinet?",
			text: "Are you sure you want to save changes",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willEdit) => {
			if (willEdit) {
				const updateCabinet = axios({
					method: "POST",
					url: url.url + "edit/cabinet",
					data:{
						id,
						job,
						type,
						color,
						height,
						width,
						quantity,
						hinges,
						screws
					}
				});
				updateCabinet.then(data =>{
					// console.log(data)
					this.props.updateCabinet(data);
					document.getElementById(`cabinetModal` + this.props.index).click()
					// console.log(data)
					// debugger
				});
				swal("Your cabinet has been edited!", {
					icon: "success",
				});
			} 
			else {
				swal("Your cabinet is unchanged!");
			}
		});
	}

	render(){
		// console.log(this.props.index)
		return(
			<span>
				<span data-toggle="modal" data-target={`#cabinetModal${this.props.index}`} id="editing" >
					<Glyphicon glyph="edit" /> 
				</span>

				<div className="modal fade" id={`cabinetModal${this.props.index}`} role="dialog">
					<div className="modal-dialog modal-md">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h2 className="modal-title">Job#: {this.state.job.id}</h2>
							</div>
							<div className="modal-body"> 

								<form onSubmit={this.handleSubmit}>
									<div className="col-md-12">
										<FormGroup controlId="formControlsSelect">
											<ControlLabel>Cabinet Type</ControlLabel>
											<FormControl componentClass="select" id={`cabinetType${this.props.index}`} bsSize="large">
												<option value={`${this.state.cabinet.type}`} selected disabled>{this.state.cabinet.type}</option>
												<option value="Solid Wood">Solid Wood</option>
												<option value="Rigid Thermofoil">Rigid Thermofoil</option>
												<option value="Bamboo">Bamboo</option>
											</FormControl>
										</FormGroup>

										<div className="modal-body row">
											<div className="col-md-4">
												<FormGroup bsSize="large">
													<ControlLabel>Color</ControlLabel>
													<FormControl componentClass="select" placeholder={`${this.state.cabinet.color}`} id={`cabinetColor${this.props.index}`}>
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
													<FormControl type="number" step="0.1" placeholder="0" id={`cabinetHeight${this.props.index}`} min="0" />
												</FormGroup>
											</div>
											<div className="col-md-4">
												<FormGroup bsSize="large">
													<ControlLabel>Width (in.)</ControlLabel>
													<FormControl type="number" step="0.1" placeholder="0" id={`cabinetWidth${this.props.index}`} min="0" />
												</FormGroup>
											</div>
										</div>
										<div className="modal-body row">

											<div className="col-md-4">
												<FormGroup bsSize="large">
													<ControlLabel>Hinges</ControlLabel>
													<FormControl type="number" placeholder="0" id={`cabinetHinges${this.props.index}`} min="0" />
												</FormGroup>
											</div>
											<div className="col-md-4">
												<FormGroup bsSize="large">
													<ControlLabel>Screws</ControlLabel>
													<FormControl type="number" placeholder="0" id={`cabinetScrews${this.props.index}`} min="0" />
												</FormGroup>
											</div>
											<div className="col-md-4">
												<FormGroup bsSize="large">
													<ControlLabel>Quantity</ControlLabel>
													<FormControl type="number" placeholder="0" id={`cabinetQuantity${this.props.index}`} min="1" />
												</FormGroup>
											</div>
										</div>
										<Button type="submit">Submit</Button>
									</div>
								</form>
							</div>
							<div className="modal-footer">
							</div>
						</div>
					</div>
				</div>
			</span>
		)
	}

}
export default CabinetEdit;