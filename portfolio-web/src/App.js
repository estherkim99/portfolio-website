import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./containers/home";
import Projects from "./containers/projects";
import Cv from "./containers/cv";



function App() {
  return (
      <Router>
        <Navigation />
        
        <div>
          <Switch>{/* <Route path="/:id" children={<Child />} /> */}</Switch>
        </div>
        <Route exact path='/' >
        <Home />
        </Route>
        <Route path="/about">
          about
        </Route>
        <Route path="/cv"><Cv /></Route>
        <Route path="/projects"><Projects /></Route>
      </Router>
  );
}

export default App;
