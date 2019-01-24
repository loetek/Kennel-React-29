import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./animal/AnimalList";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import OwnersList from "./owners/OwnersList";
import AnimalManager from "../modules/AnimalManager";
import LocationManager from "../modules/LocationManager";
import EmployeeManager from "../modules/EmployeeManager";
import OwnerManager from "../modules/OwnerManager";
import AnimalDetail from "./animal/AnimalDetail";
import Login from './authentication/Login'

export default class ApplicationViews extends Component {
  state = {
    animals: [],
    employees: [],
    locations: [],
    owners: []
  };

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  isRemembered = () => localStorage.getItem("checked") !==null;


  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(response => response.json())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );
  };

  componentDidMount() {
    // Example code. Make this fit into how you have written yours.
    AnimalManager.getAll().then(allAnimals => {
      this.setState({
        animals: allAnimals
      });
    });

    LocationManager.getAll().then(allLocations => {
      this.setState({
        locations: allLocations
      });
    });

    EmployeeManager.getAll().then(allEmployees => {
      this.setState({
        employees: allEmployees
      });
    });

    OwnerManager.getAll().then(allOwners => {
      this.setState({
        owners: allOwners
      });
    });
  }

  render() {
    return (
      <React.Fragment>
      <Route path="/login" component={Login} />
        <Route exact path="/" render={props => {
          if(this.isRemembered()){
            return <LocationList locations={this.state.locations} />;
          }
          else if(this.isAuthenticated){
            return <LocationList locations={this.state.locations} />;
          }
          else {
            return <Redirect to="/login" />
          }          }}
        />
        <Route exact path="/animals" render={props => {
          if (this.isRemembered()){
            return <AnimalList animals={this.state.animals} />
          }
          else if(this.isAuthenticated()){
            return <AnimalList animals={this.state.animals} />
          }
          else {
            return <Redirect to="/login" />
          }
          }}
        />
        <Route
          path="/animals/:animalId(\d+)"
          render={props => {
            return (
              <AnimalDetail
                {...props}
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            );
          }}
        />
        <Route exact path="/employees" render={props => {
          if (this.isRemembered()){
            return <EmployeeList deleteEmployee={this.deleteEmployee}
                                   employees={this.state.employees} />
          }
          else if (this.isAuthenticated()) {
              return <EmployeeList deleteEmployee={this.deleteEmployee}
                                   employees={this.state.employees} />
          }
          else {
              return <Redirect to="/login" />
          }
      }}
        />
          <Route exact path="/owners" render={props => {
            if(this.isRemembered()){
              return <OwnersList owners={this.state.owners} />
            }
            else if (this.isAuthenticated()){
              return <OwnersList owners={this.state.owners} />
            }
            else {
              return<Redirect to="/login" />
            }
            }
          }
        />
      </React.Fragment>
    );
  }
}
