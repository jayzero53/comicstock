import React, {Component} from 'react';
import axios from 'axios';

import './index.css';
import Supplier from './Supplier.jsx';
import {getSuppliers} from "./ApiTools";
import {API_SUPPLIERS_URL, APP_SUPPLIERS_ADD_URL, APP_SUPPLIERS_EDIT_URL, PAGINATION_ITEMS_PER_PAGE} from "./Constants";


class ComicSuppliers extends Component{

    constructor(props){
        super();
        this.state = {
            suppliersList: [],
            searchCharacters: '',
            currentPage: 1,
            itemsPerPage: PAGINATION_ITEMS_PER_PAGE,
        };
        this.history = props.history;
        this.handlePageNumberClick = this.handlePageNumberClick.bind(this);
    }

    handlePageNumberClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
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
        let editURL = APP_SUPPLIERS_EDIT_URL + supplierID;
        this.history.push(editURL);
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

    handleAddClicked(){
        this.history.push(APP_SUPPLIERS_ADD_URL)
    }

    render (){

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

        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage;

        const indexOfLastSupplier = currentPage * itemsPerPage;
        const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(displayItems.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePageNumberClick}
                >
                    {number}
                </li>
            );
        });

        return(
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <button className="jose_theme" onClick={this.handleAddClicked.bind(this)}>Add new</button>
                    </div>
                    <div className="col-md-3 pull-right">
                        <input type="text" className="form-control" placeholder={"Search"} onChange={this.handleSearchChange.bind(this)}/>
                    </div>
                </div>
                <div className="row jose_row">
                    {
                        displayItems.slice(indexOfFirstSupplier, indexOfLastSupplier).map((item, index) => (
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
                <div>
                    <ul id="page-numbers">
                        {renderPageNumbers}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ComicSuppliers;