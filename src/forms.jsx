import React, {Component} from 'react';
import axios from 'axios';
import Redirect from "react-router-dom/es/Redirect";

import './index.css';
import {API_SUPPLIERS_URL, APP_SUPPLIERS_URL} from "./constants";
import {getSuppliers} from "./ApiTools";


class SupplierAddForm extends Component{
    constructor(){
        super();
        this.state = {
            city: '',
            name: '',
            reference: '',
            editComplete: false
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
        axios.post(
            API_SUPPLIERS_URL,
            {
                city: this.state.city,
                name: this.state.name,
                reference: this.state.reference,
            }
        )
        .then(
            (result) => {
                console.log(result.data);
            }
        )
        .catch(
            function (error) {
                console.log(error);
            }
        );
        this.setState(
            {editComplete: true,}
        )
    }

    render() {

        if (this.state.editComplete){
            getSuppliers();
            return <Redirect to={APP_SUPPLIERS_URL}/>;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>City</label><br/>
                    <input type="text" className="form-control" placeholder={this.state.city || "City"} value={this.state.city} onChange={this.handleCityChange} />
                </div>
                <div className="form-group">
                    <label>Name</label><br/>
                    <input type="text" className="form-control" placeholder={this.state.name || "Name"} value={this.state.name} onChange={this.handleNameChange} />
                </div>
                <div className="form-group">
                    <label>Reference</label><br/>
                    <input type="text" className="form-control" placeholder={this.state.reference || "Reference"} value={this.state.reference} onChange={this.handleReferenceChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        );
    }
}

class SupplierEditForm extends SupplierAddForm{

    constructor(supplierID){
        super();

        // TODO: Cleanup
        const id = supplierID.match.params.id;
        let requestURL = API_SUPPLIERS_URL + id;

        axios.get(
            requestURL
        )
            .then(
                //TODO: Only proceed if we found something
                (response) => {

                    console.log('All went well');
                    console.log(response);
                    console.log(response.data);

                    this.state = {
                        id: id,
                        city: response.data.city,
                        name: response.data.name,
                        reference: response.data.reference,
                        editComplete: false,
                    };
                    this.forceUpdate()
                }
            )
            .catch(
                (error) => {
                    console.log('An error occurred');
                    console.log(error)
                }
            );

        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleReferenceChange = this.handleReferenceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log('this ID: '+this.state.id);
        event.preventDefault();
        console.log('this ID: '+this.state.id);
        axios.put(
            API_SUPPLIERS_URL,
            {
                id: this.state.id,
                city: this.state.city,
                name: this.state.name,
                reference: this.state.reference,
            }
        )
            .then(
                (result) => {
                    console.log(result.data);
                }
            )
            .catch(
                function (error) {
                    console.log(error);
                }
            );
        this.setState(
            {editComplete: true,}
        )
    }
}

export {
    SupplierAddForm,
    SupplierEditForm
}