import React, { Component } from 'react';
import {BrowserRouter, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Jobs from './components/Jobs';
import NavBar from './components/NavBar';
import SingleJob from './components/SingleJob';
import Door from './components/Door';
import Logout from './components/Logout';
import './style.css';
import './App.css';

class App extends Component {
  render() {
    return (
        
          
      <BrowserRouter>
        <div className="App">
          <Route path = "/" component={NavBar}/>
          <Route exact path = "/" component={Login}/>
          <Route exact path = "/register" component={Register}/>  
          <Route exact path = "/jobs" component={Jobs} />
          <Route path="/job/:job_id" component={SingleJob} />
          <Route exact path = "/logout" component={Logout} />    
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
