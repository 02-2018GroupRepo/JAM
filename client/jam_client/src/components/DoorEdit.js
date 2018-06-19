import React, {Component} from 'react';
import axios from 'axios';
import url from '../url';
import {FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap';
import swal from 'sweetalert';

class DoorEdit extends Component{

  constructor(){
		super();
		this.state={
			door: {},
			job: {}
		}
		this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentDidMount(){
		this.setState({
			door: this.props.door,
			job: this.props.door.job,
    })

		document.getElementById(`doorType${this.props.index}`).setAttribute("value", this.props.door.type)
		document.getElementById(`doorColor${this.props.index}`).setAttribute("value", this.props.door.color)
		document.getElementById(`doorHeight${this.props.index}`).setAttribute("value", this.props.door.height)
		document.getElementById(`doorWidth${this.props.index}`).setAttribute("value", this.props.door.width)
		document.getElementById(`doorQuantity${this.props.index}`).setAttribute("value", this.props.door.quantity)
		document.getElementById(`doorHinges${this.props.index}`).setAttribute("value", this.props.door.hinges)
		document.getElementById(`doorScrews${this.props.index}`).setAttribute("value", this.props.door.screws)
  }

  handleSubmit(event){
		event.preventDefault();
		// console.log(this.props.index)
		const job = this.state.job;
		const id = this.state.door.id
		const type = document.getElementById(`doorType${this.props.index}`).value;
		const color = document.getElementById(`doorColor${this.props.index}`).value;
		const height = document.getElementById(`doorHeight${this.props.index}`).value;
		const width = document.getElementById(`doorWidth${this.props.index}`).value;
	    const quantity = document.getElementById(`doorQuantity${this.props.index}`).value;
	    const hinges = document.getElementById(`doorHinges${this.props.index}`).value;
	    const screws = document.getElementById(`doorScrews${this.props.index}`).value;

	    swal({
			title: "Edit Door?",
			text: "Are you sure you want to save changes",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willEdit) => {
			if (willEdit) {
				const updateDoor = axios({
					method: "POST",
					url: url.url + "edit/door",
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
			updateDoor.then(data =>{
				// console.log(data)
				this.props.updateDoor(data);
				document.getElementById(`doorModal` + this.props.index).click()
				// console.log(data)
				// debugger
			});
				swal("Your door has been edited!", {
					icon: "success",
				});
			} 
			else {
				swal("Your door is unchanged!");
			}
		});
	}

  render(){
    return(

      <span>
			<span data-toggle="modal" data-target={`#doorModal${this.props.index}`} id="editing">
				<Glyphicon glyph="edit" /> 
			 </span>

    		<div className="modal fade" id={`doorModal${this.props.index}`} role="dialog">
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
			                  <ControlLabel>Door Type</ControlLabel>
			                    <FormControl componentClass="select" id={`doorType${this.props.index}`} bsSize="large">
			                      	<option value={`${this.state.door.type}`} selected disabled>{this.state.door.type}</option>
			                      	<option value="Fiber Glass">Fiber Glass</option>
			                      	<option value="Wood">Wood</option>
                          			<option value="Steel">Steel</option>
			                    </FormControl>
			                </FormGroup>

                    		<div className="modal-body row">
								<div className="col-md-4">
									<FormGroup bsSize="large">
									    <ControlLabel>Color</ControlLabel>
									  	<FormControl componentClass="select" placeholder={`${this.state.door.color}`} id={`doorColor${this.props.index}`}>
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
			                      <FormControl type="number" step="0.1" placeholder="0" id={`doorHeight${this.props.index}`} min="0" />
			                    </FormGroup>
			                  </div>
			                  <div className="col-md-4">
			                    <FormGroup bsSize="large">
			                        <ControlLabel>Width (in.)</ControlLabel>
			                      <FormControl type="number" step="0.1" placeholder="0" id={`doorWidth${this.props.index}`} min="0" />
			                    </FormGroup>
			                  </div>
			                </div>
			                <div className="modal-body row">
                      			<div className="col-md-4">
				                    <FormGroup bsSize="large">
				                        <ControlLabel>Hinges</ControlLabel>
				                      <FormControl type="number" placeholder="0" id={`doorHinges${this.props.index}`} min="0" />
				                    </FormGroup>
			                  	</div>
                      			<div className="col-md-4">
				                    <FormGroup bsSize="large">
				                        <ControlLabel>Screws</ControlLabel>
				                      <FormControl type="number" placeholder="0" id={`doorScrews${this.props.index}`} min="0" />
				                    </FormGroup>
			                  	</div>
			                
			                	<div className="col-md-4">
			                    	<FormGroup bsSize="large">
			                        	<ControlLabel>Quantity</ControlLabel>
			                      		<FormControl type="number" placeholder="0" id={`doorQuantity${this.props.index}`} min="1" />
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
export default DoorEdit;