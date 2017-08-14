import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Redirect from "react-router-dom/es/Redirect";

import './index.css';
import Supplier from './Supplier.jsx';
import {API_SUPPLIERS_URL, APP_SUPPLIERS_ADD_URL, APP_SUPPLIERS_EDIT_URL} from "./constants";
import {getSuppliers} from "./ApiTools";


class ComicSuppliers extends Component{

    constructor(){
        super();
        this.state = {
            suppliersList: [],
            searchCharacters: '',
            editSupplierID: null,
        };
    }

    componentDidMount(){
        getSuppliers()
        .then(
            (suppliers) =>this.setState({suppliersList: suppliers})
        )
    }

    renderSupplier(key, id, name, city, reference, editHandler, deleteHandler) {
        return (
            <Supplier
                key={key}
                id={id}
                name={name}
                city={city}
                reference={reference}

                editHandler={editHandler.bind(this)}
                deleteHandler={deleteHandler.bind(this)}
            />
        );
    }

    editSupplier(supplierID){
        // TODO: Use proper site navigation and remove hack
        this.setState({editSupplierID: supplierID})
    }

    deleteSupplier(supplierID){
        axios.delete(
            API_SUPPLIERS_URL + supplierID
        )
        .then( () => {
            getSuppliers()
                .then( (suppliers) =>
                    this.setState({suppliersList: suppliers})
                );
            }
        )
        .catch (
            function (error) {
                console.log('error: '+error)
            }
        );
    }

    handleSearchChange(event){
        this.setState(
            {searchCharacters: event.target.value}
        )
    }

    render (){
        console.log(this.state);

        if (this.state.editSupplierID)
        {
            let editURL = APP_SUPPLIERS_EDIT_URL + this.state.editSupplierID;
            // TODO: Remove state transition from render (is anti-pattern)
            this.setState({editSupplierID: null});
            return <Redirect to={editURL}/>;
        }

        console.log(this.state.searchCharacters);

        let displayItems = this.state.suppliersList;
        let searchChars = this.state.searchCharacters;
        if (searchChars){
            displayItems = displayItems.filter(
                function(supplierInstance){
                    return supplierInstance.city.toLowerCase().indexOf(searchChars.toLowerCase()) !== -1 ||
                           supplierInstance.name.toLowerCase().indexOf(searchChars.toLowerCase()) !== -1 ||
                           supplierInstance.reference.toLowerCase().indexOf(searchChars.toLowerCase()) !== -1
                }
            );
        }

        return(
            <div>
                <div className="row">
                    <Link to={APP_SUPPLIERS_ADD_URL}>Add new</Link>
                </div>
                <div className="row">
                    <input type="text" className="form-control" placeholder={"Search"} onChange={this.handleSearchChange.bind(this)}/>
                </div>
                <div className="row">
                    {
                        displayItems.map((item, index) => (
                            this.renderSupplier(
                                index,
                                item.id,
                                item.name,
                                item.city,
                                item.reference,
                                this.editSupplier,
                                this.deleteSupplier,
                            )
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default ComicSuppliers;