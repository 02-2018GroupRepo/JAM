import React, {Component} from 'react';
import axios from 'axios';
import url from '../url';
import {Button, ButtonToolbar} from 'react-bootstrap';

class CompleteJobs extends Component{
	constructor(){
		super();
		this.state={
			token: localStorage.getItem('token'),
			job:{},
			customer:{},
			windows: [],
			doors: [],
			cabinets: []
		}
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

	render(){
		console.log(this.state)
		return(
			<h1> YO! </h1>
		)
	}

}

export default CompleteJobs