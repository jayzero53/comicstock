import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import Supplier from './ComicSupplierComponent';
import { getSuppliers } from './ApiTools';
import {
  API_SUPPLIERS_URL,
  APP_SUPPLIERS_ADD_URL,
  APP_SUPPLIERS_EDIT_URL,
  PAGINATION_ITEMS_PER_PAGE,
} from './Constants';

class ComicSuppliersContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      suppliersList: [],
      searchCharacters: '',
      currentPage: 1,
      itemsPerPage: PAGINATION_ITEMS_PER_PAGE,
    };
    this.history = props.history;
    this.handlePageNumberClick = this.handlePageNumberClick.bind(this);
    this.handleAddClicked = this.handleAddClicked.bind(this);
    this.editSupplier = this.editSupplier.bind(this);
    this.deleteSupplier = this.deleteSupplier.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    getSuppliers().then(suppliers =>
      this.setState({ suppliersList: suppliers }),
    );
  }

  handlePageNumberClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleAddClicked() {
    this.history.push(APP_SUPPLIERS_ADD_URL);
  }

  editSupplier(supplierID) {
    const editURL = APP_SUPPLIERS_EDIT_URL + supplierID;
    this.history.push(editURL);
  }

  deleteSupplier(supplierID) {
    axios
      .delete(API_SUPPLIERS_URL + supplierID)
      .then(() => {
        getSuppliers().then(suppliers =>
          this.setState({ suppliersList: suppliers }),
        );
      })
      .catch(error => {
        console.error(`error: ${error}`);
      });
  }

  handleSearchChange(event) {
    this.setState({ searchCharacters: event.target.value });
  }

  render() {
    let displayItems = this.state.suppliersList;
    const searchChars = this.state.searchCharacters;
    if (searchChars) {
      displayItems = displayItems.filter(
        supplierInstance =>
          supplierInstance.city
            .toLowerCase()
            .indexOf(searchChars.toLowerCase()) !== -1 ||
          supplierInstance.name
            .toLowerCase()
            .indexOf(searchChars.toLowerCase()) !== -1 ||
          supplierInstance.reference
            .toLowerCase()
            .indexOf(searchChars.toLowerCase()) !== -1,
      );
    }

    const currentPage = this.state.currentPage;
    const itemsPerPage = this.state.itemsPerPage;

    const indexOfLastSupplier = currentPage * itemsPerPage;
    const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(displayItems.length / itemsPerPage);
      i += 1
    ) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number =>
      <li key={number} id={number} onClick={this.handlePageNumberClick}>
        {number}
      </li>,
    );

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <button className="jose_theme" onClick={this.handleAddClicked}>
              Add new
            </button>
          </div>
          <div className="col-md-3 pull-right">
            <input
              type="text"
              className="form-control"
              placeholder={'Search'}
              onChange={this.handleSearchChange}
            />
          </div>
        </div>
        <div className="row jose_row">
          {displayItems
            .slice(indexOfFirstSupplier, indexOfLastSupplier)
            .map((item, index) =>
              <Supplier
                key={String(index)}
                id={item.id}
                name={item.name}
                city={item.city}
                reference={item.reference}
                editHandler={this.editSupplier}
                deleteHandler={this.deleteSupplier}
              />,
            )}
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

ComicSuppliersContainer.constructor.propTypes = {
  history: PropTypes.objectOf(BrowserRouter.history).isRequired,
};

export default ComicSuppliersContainer;
