import React, {Component} from 'react';
import axios from 'axios';
import {Glyphicon, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import url from '../url';

class WindowEdit extends Component{
	constructor(){
		super();
		this.state={
			window: {},
			job: {}
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount(){
		this.setState({
			window: this.props.window,
			job: this.props.window.job,
		})
		// console.log(this.state.window)
    	// document.getElementById('window_height').setAttribute("value", this.state.window.height);
    	// document.getElementById('window_width').setAttribute("value", this.state.width);
	}

	handleSubmit(event){
		event.preventDefault();
		// console.log(this.props.index)
		const job = this.state.job;
		const id = this.state.window.id
		const width = document.getElementById(`width${this.props.index}`).value;
		const height = document.getElementById(`height${this.props.index}`).value;
		const quantity = document.getElementById(`quantity${this.props.index}`).value;
		const color = document.getElementById(`color${this.props.index}`).value;
		const type = document.getElementById(`type${this.props.index}`).value;
		
		const updateWindow = axios({
			method: "POST",
			url: url.url + "edit/window",
			data:{
				id,
				job,
				width,
				height,
				quantity,
				color,
				type
			}
		});
	}

	render(){

		// console.log("PROPS",this.props.window)
		// console.log("STATE",this.state.job.id)

		// console.log(this.props.window)
		return(
			<span>
				<span data-toggle="modal" data-target={`#windowModal${this.props.index}`}>
					<Glyphicon glyph="edit" /> 
				</span>

				<div className="modal fade" id={`windowModal${this.props.index}`} role="dialog">
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
				                  <ControlLabel>Window Type</ControlLabel>
				                    <FormControl componentClass="select" id={`type${this.props.index}`} bsSize="large">
				                      <option value="" selected disabled>{this.state.window.type}</option>
				                      <option value="Single Hung Windows">Single Hung Windows</option>
				                      <option value="Double Hung Windows">Double Hung Windows</option>
				                      <option value="Casement Windows">Casement Windows</option>
				                      <option value="Awning Windows">Awning Windows</option>
				                      <option value="Sliding Windows">Sliding Windows</option>
				                      <option value="Basement Windows">Basement Windows</option>
				                      <option value="Skylights">Skylights</option>
				                      <option value="Glass Block Windows">Glass Block Windows</option>
				                    </FormControl>
				                </FormGroup>


				                <div className="modal-body row">
				                  <div className="col-md-4">
				                      <FormGroup bsSize="large">
				                        <ControlLabel>Color</ControlLabel>
				                      <FormControl componentClass="select" placeholder={`${this.state.window.color}`} id={`color${this.props.index}`}>
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
				                      <FormControl type="number" placeholder="0" id={`height${this.props.index}`} min="0" />
				                    </FormGroup>
				                  </div>
				                  <div className="col-md-4">
				                    <FormGroup bsSize="large">
				                        <ControlLabel>Width (in.)</ControlLabel>
				                      <FormControl type="number" placeholder="0" id={`width${this.props.index}`} min="0" />
				                    </FormGroup>
				                  </div>
				                </div>
				                
				                <div className="modal-body row">
				                  <div className="col-md-4">
				                      <FormGroup bsSize="large">
				                        <ControlLabel>Quantity</ControlLabel>
				                      <FormControl type="number" placeholder="0" id={`quantity${this.props.index}`} min="1" />
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

export default WindowEdit;