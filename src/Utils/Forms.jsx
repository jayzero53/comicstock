import React, { Component } from 'react';
import axios from 'axios';
import Redirect from 'react-router-dom/es/Redirect';
import {ControlLabel} from 'react-bootstrap';

import '../index.css';
import { API_SUPPLIERS_URL, APP_SUPPLIERS_URL } from './Constants';
import { getSuppliers } from './ApiTools';

class SupplierAddForm extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      name: '',
      reference: '',
      editComplete: false,
    };

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleReferenceChange = this.handleReferenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCityChange(event) {
    this.setState({
      city: event.target.value,
    });
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleReferenceChange(event) {
    this.setState({
      reference: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post(API_SUPPLIERS_URL, {
        city: this.state.city,
        name: this.state.name,
        reference: this.state.reference,
      })
      .then(result => {
        console.info(result.data);
      })
      .catch(error => {
        console.error(error);
      });
    this.setState({ editComplete: true });
  }

  render() {
    if (this.state.editComplete) {
      getSuppliers();
      return <Redirect to={APP_SUPPLIERS_URL} />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <ControlLabel>City</ControlLabel>
          <br />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder={this.state.city || 'City'}
            value={this.state.city}
            onChange={this.handleCityChange}
          />
        </div>
        <div className="form-group">
          <ControlLabel>Name</ControlLabel>
          <br />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder={this.state.name || 'Name'}
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>
        <div className="form-group">
          <ControlLabel>Reference</ControlLabel>
          <br />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder={this.state.reference || 'Reference'}
            value={this.state.reference}
            onChange={this.handleReferenceChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary jose_theme">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

class SupplierEditForm extends SupplierAddForm {
  constructor(props) {
    super();

    const id = props.match.params.id;
    const requestURL = API_SUPPLIERS_URL + id;

    axios
      .get(requestURL)
      .then(response => {
        this.state = {
          id,
          city: response.data.city,
          name: response.data.name,
          reference: response.data.reference,
          editComplete: false,
        };
        this.forceUpdate();
      })
      .catch(error => {
        console.error(error);
      });

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleReferenceChange = this.handleReferenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios
      .put(API_SUPPLIERS_URL, {
        id: this.state.id,
        city: this.state.city,
        name: this.state.name,
        reference: this.state.reference,
      })
      .then(result => {
        console.info(result.data);
      })
      .catch(error => {
        console.error(error);
      });
    this.setState({ editComplete: true });
  }
}

export { SupplierAddForm, SupplierEditForm };
