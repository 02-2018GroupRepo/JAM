import React, {Component} from 'react';
import axios from 'axios';
import url from '../url';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import swal from 'sweetalert';

class Cabinet extends Component{
  constructor(){
    super();
    this.state={
      job_id: "",
      cabinet: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState={
      job_id : this.props.job_id
    }
    document.getElementById('cabinet_quantity').setAttribute("value", "1");
    document.getElementById('cabinet_hinges').setAttribute("value", "1");
    document.getElementById('cabinet_screws').setAttribute("value", "4");
    document.getElementById('cabinet_height').setAttribute("value", "15");
    document.getElementById('cabinet_width').setAttribute("value", "34");
  }

  handleQuantity(){
    let quantity = document.getElementById('cabinet_quantity');
    let hinges = document.getElementById('cabinet_hinges');
    let screws = document.getElementById('cabinet_screws');
    const numHinges = (quantity.value * 1);
    hinges.setAttribute("value", numHinges);
    const numScrews = (numHinges * 4);
    screws.setAttribute("value", numScrews)
  }

  handleSubmit(event){
    event.preventDefault()
    //const type = document.getElementById('cabinet_type').value
    const type = document.getElementById('cabinet_type').value
    const hinges = document.getElementById('cabinet_hinges').value
    const screws = document.getElementById('cabinet_screws').value
    const quantity = document.getElementById('cabinet_quantity').value
    const color = document.getElementById('cabinet_color').value
    const height = document.getElementById('cabinet_height').value
    const width = document.getElementById('cabinet_width').value
    const job = this.props.job_id

    const cabinetCreate = axios({
        method: "POST",
        url: url.url + "cabinet/create",
        data: {
          job,
          type,
          hinges,
          screws,
          quantity,
          color,
          height,
          width  
        }
    })
    
    cabinetCreate.then(data =>{
      this.props.updateCabinet(data);
      swal("Cabinet has been added!", {
          icon: "success",
      });
    })
  }


  render(){
    return(
      <div className="container">
        <div className="modal-body row">
              <form onSubmit={this.handleSubmit}>
                <div className="col-md-6">
              <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Cabinet Type</ControlLabel>
                    <FormControl componentClass="select" placeholder="Cabinet Type" id="cabinet_type" bsSize="large">
                      <option value="Solid Wood">Solid Wood</option>
                      <option value="Rigid Thermofoil">Rigid Thermofoil</option>
                      <option value="Bamboo">Bamboo</option>
                    </FormControl>
                </FormGroup>


                <div className="modal-body row">
                  <div className="col-md-4">
                      <FormGroup bsSize="large">
                        <ControlLabel>Color</ControlLabel>
                      <FormControl componentClass="select" placeholder="Color" id="cabinet_color">
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
                      <FormControl type="number" step="0.1" step="0.1" placeholder="0" id="cabinet_height" min="0" />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup bsSize="large">
                        <ControlLabel>Width (in.)</ControlLabel>
                      <FormControl type="number" step="0.1" placeholder="0" id="cabinet_width" min="0" />
                    </FormGroup>
                  </div>
                </div>
                
                <div className="modal-body row">

                  <div className="col-md-4">
                    <FormGroup bsSize="large">
                        <ControlLabel>Hinges</ControlLabel>
                      <FormControl type="number" placeholder="2" id="cabinet_hinges" min="1" />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup bsSize="large">
                        <ControlLabel>Screws</ControlLabel>
                      <FormControl type="number" placeholder="8" id="cabinet_screws" min="4" />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="col-md-3">
                    <FormGroup bsSize="large">
                      <ControlLabel>Quantity</ControlLabel>
                  <FormControl type="number" placeholder="1" id="cabinet_quantity" min="1" onChange={this.handleQuantity} />
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
export default Cabinet;