import React, { Component } from 'react';
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Login from './screen/login/Login';
import Home from './screen/doctor/home/DoctorHome';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './container/layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter basename="/">
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" name="Login" component={Login} />
            <Route path="/merechain" name="Home" component={Layout}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
export default App;
