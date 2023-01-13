import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
