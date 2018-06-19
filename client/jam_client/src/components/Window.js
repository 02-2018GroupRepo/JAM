import React, {Component} from 'react';
import axios from 'axios';
import url from '../url';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import swal from 'sweetalert';

class Window extends Component{
  constructor(props){
    super(props);
    this.state={
      job_id: "",
      window: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState={
      job_id : this.props.job_id
    }
    document.getElementById('window_quantity').setAttribute("value", "1");
    document.getElementById('window_height').setAttribute("value", "24");
    document.getElementById('window_width').setAttribute("value", "24");
  }

  handleSubmit(event){
    event.preventDefault()
    const type = document.getElementById('window_type').value
    const height = document.getElementById('window_height').value
    const width = document.getElementById('window_width').value
    const quantity = document.getElementById('window_quantity').value
    const color = document.getElementById('window_color').value
    const job = this.props.job_id
    
    const windowCreate = axios({
      method: 'POST',
      url: url.url + "window/create",
      data:{
        job,
        type,
        height,
        width,
        quantity,
        color
      }
    })
    windowCreate.then(data=>{
      this.props.updateWindow(data);
      swal("Window has been added!", {
          icon: "success",
      });

      // console.log("YOO")
    })
  }


  render(){
    return(
      <div className="container">
        <div className="modal-body row">
              <form onSubmit={this.handleSubmit}>
                <div className="col-md-6">
              <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Window Type</ControlLabel>
                    <FormControl componentClass="select" placeholder="Window Type" id="window_type" bsSize="large">
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
                  <div className="col-md-3">
                      <FormGroup bsSize="large">
                        <ControlLabel>Color</ControlLabel>
                      <FormControl componentClass="select" placeholder="Color" id="window_color">
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Blue">Blue</option>
                        <option value="Silver">Silver</option>
                        </FormControl>
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup bsSize="large">
                        <ControlLabel>Height (in.)</ControlLabel>
                      <FormControl type="number" step="0.1" placeholder="0" id="window_height" min="0" />
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup bsSize="large">
                        <ControlLabel>Width (in.)</ControlLabel>
                      <FormControl type="number" step="0.1" placeholder="0" id="window_width" min="0" />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="col-md-3">
                    <FormGroup bsSize="large">
                      <ControlLabel>Quantity</ControlLabel>
                  <FormControl type="number" placeholder="1" id="window_quantity" min="1" onChange={this.handleQuantity} />
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
export default Window;