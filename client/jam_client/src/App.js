import React, { Component } from 'react';
import {BrowserRouter, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Jobs from './components/Jobs';
import NavBar from './components/NavBar';
import SingleJob from './components/SingleJob';
import Door from './components/Door';
import Logout from './components/Logout';
import CompleteJobs from './components/CompleteJobs';
import './style.css';
import './App.css';

class App extends Component {
  render() {
    return (
        
          
      <BrowserRouter>
        <div className="App">
          <Route path = "/" render={(props)=>(
           <NavBar history = {props.history}/> 
           )}/>
          <Route exact path = "/" component={Login}/>
          <Route exact path = "/register" component={Register}/>  
          <Route exact path = "/jobs" render={(props)=>(
           <Jobs history = {props.history}/> 
           )}/>
          <Route path="/job/:job_id" render={(props)=>(
           <SingleJob match={props.match} history = {props.history}/> 
           )}/>
          <Route exact path = "/logout" component={Logout} />    
          <Route exact path="/complete/:job_id"  render={(props)=>(
           <CompleteJobs  match={props.match} history = {props.history}/> 
           )}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
