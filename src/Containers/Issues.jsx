import AlertContainer from 'react-alert';
import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import '../index.css';

import { BigComic, Issue } from '../Components/Issue';
import { getIssues, getSuppliers, postToOrdersAPI } from '../Utils/ApiTools';
import {
  ALERT_OPTIONS,
  ISSUE_QUALITY_OPTIONS,
  MIN_ITEMS_PER_ORDER,
} from '../Utils/Constants';

class ComicIssuesContainer extends Component {
  constructor() {
    super();
    this.state = {
      issuesList: [],
      suppliersList: [],
      selectedIssue: null,
      buyNowClicked: false,

      comicOrder: {
        supplierID: null,
        comicID: null,
        quality: null,
        quantity: null,
      },
    };

    this.handleBuyNowClicked = this.handleBuyNowClicked.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleQualitySelected = this.handleQualitySelected.bind(this);
    this.handleSupplierSelected = this.handleSupplierSelected.bind(this);
    this.checkPurchaseInfoComplete = this.checkPurchaseInfoComplete.bind(this);
    this.orderComic = this.orderComic.bind(this);
    this.handleBuyNowModalClosed = this.handleBuyNowModalClosed.bind(this);
  }

  componentDidMount() {
    getIssues().then(issues => {
      this.setState({ issuesList: issues });
    });

    getSuppliers().then(suppliers => {
      this.setState({ suppliersList: suppliers });
    });
  }

  onMiniComicClick(comicID) {
    this.setState({
      selectedIssue: comicID,
    });
  }

  orderComic(comicID, quality, supplierID) {
    postToOrdersAPI(comicID, quality, supplierID).then(response => {
      const responseClass =
        response.response && response.response.request.status > 200
          ? 'error'
          : 'success';
      const responseText =
        responseClass === 'error'
          ? String(response.response.statusText)
          : String(response.statusText);
      this.showAlert(responseText, responseClass);
    });
  }

  returnComicWithID(comicID) {
    for (let i = 0; i < this.state.issuesList.length; i += 1) {
      const comic = this.state.issuesList[i];
      if (comic.id === comicID) {
        return comic;
      }
    }
    return null;
  }

  showAlert(alertText, type) {
    // Needed function for AlertContainer to function properly
    this.msg.show(alertText, {
      time: 2000,
      type,
    });
  }

  handleBuyNowClicked() {
    this.setState({ buyNowClicked: true });
  }

  handleBuyNowModalClosed() {
    this.setState({
      buyNowClicked: false,
      comicOrder: {
        comicID: null,
        quality: null,
        quantity: null,
      },
    });
  }

  handleQuantityChange(event) {
    const quantity = event.target.value;
    const currentOrder = this.state.comicOrder;
    currentOrder.quantity = quantity;
    this.setState({ comicOrder: currentOrder });
  }

  handleOrderBeingPlaced(comicID) {
    let currentOrder = this.state.comicOrder;
    currentOrder.comicID = comicID;
    currentOrder.quantity = currentOrder.quantity || MIN_ITEMS_PER_ORDER;
    this.setState({ comicOrder: currentOrder });

    currentOrder = this.state.comicOrder;
    for (let i = 0; i < currentOrder.quantity; i += 1) {
      this.orderComic(
        currentOrder.comicID,
        currentOrder.quality,
        currentOrder.supplierID,
      );
    }

    this.setState({
      buyNowClicked: false,
      comicOrder: {
        comicID: null,
        quality: null,
        quantity: null,
      },
    });
  }

  handleSupplierSelected(event) {
    const supplier = event.target.value;
    const currentOrder = this.state.comicOrder;
    currentOrder.supplierID = supplier;
    this.setState({ comicOrder: currentOrder });
  }

  handleQualitySelected(event) {
    const quality = event.target.value;
    const currentOrder = this.state.comicOrder;
    currentOrder.quality = quality;
    this.setState({ comicOrder: currentOrder });
  }

  checkPurchaseInfoComplete() {
    // returns true if quantity is null (which will be defaulted to 1) or 1 or more AND
    // both, supplier and quality, has been specified
    if (
      this.state.comicOrder.supplierID === null ||
      this.state.comicOrder.quality === null
    ) {
      return false;
    }
    if (
      this.state.comicOrder.quantity === '-' ||
      this.state.comicOrder.quantity === '+'
    )
      return false;
    return !(
      this.state.comicOrder.quantity !== null &&
      this.state.comicOrder.quantity < 1
    );
  }

  renderComicPreview(id, title, seriesNumber, publisher, thumbnail) {
    return (
      <Issue
        key={id}
        title={title}
        seriesNumber={seriesNumber}
        publisher={publisher}
        thumbnail={thumbnail}
        clickHandler={() => this.onMiniComicClick(id)}
      />
    );
  }

  renderLargeComic(comicID, buyButtonHandler) {
    const comic = this.returnComicWithID(comicID);
    return (
      <BigComic
        key={comic.title}
        title={comic.title}
        images={comic.images}
        publisher={comic.publisher}
        publicationDate={comic.publicationDate}
        description={comic.description}
        buyButtonHandler={buyButtonHandler}
      />
    );
  }

  render() {
    let comic;
    let largeComicRendered;
    let largeComicDiv = <div className="five-forty-p" />;
    const purchaseInfoComplete = this.checkPurchaseInfoComplete();

    if (this.state.selectedIssue) {
      comic = this.returnComicWithID(this.state.selectedIssue);
      largeComicRendered = this.renderLargeComic(
        comic.id,
        this.handleBuyNowClicked,
      );
      largeComicDiv = (
        <div className="col-md-12">
          <div>
            <AlertContainer
              ref={a => {
                this.msg = a;
              }}
              {...ALERT_OPTIONS}
            />
            <Modal
              show={this.state.buyNowClicked}
              onRequestClose={this.handleBuyNowModalClosed}
              onHide={this.handleBuyNowModalClosed}
            >
              <Modal.Header>
                <h3>
                  {comic.title}
                </h3>
              </Modal.Header>

              <Modal.Body>
                <div className="row">
                  <div className="col-md-6">
                    <p>How many copies would you like?</p>
                    <input
                      className="jose_theme"
                      onChange={this.handleQuantityChange}
                      type="number"
                      step="1"
                      defaultValue={String(MIN_ITEMS_PER_ORDER)}
                      min={String(MIN_ITEMS_PER_ORDER)}
                    />
                    <hr />
                    <p>Please select your preferred quality</p>
                    <select onChange={this.handleQualitySelected} required>
                      <option selected disabled>
                        Preferred quality...
                      </option>
                      {ISSUE_QUALITY_OPTIONS.map(qualityOption =>
                        <option className="jose_theme" value={qualityOption}>
                          {qualityOption}
                        </option>,
                      )}
                    </select>
                    <hr />
                    <p>Please select your preferred supplier</p>
                    <select onChange={this.handleSupplierSelected} required>
                      <option selected disabled>
                        Preferred supplier...
                      </option>
                      {this.state.suppliersList.map(supplier =>
                        <option className="jose_theme" value={supplier.id}>
                          {supplier.name}
                        </option>,
                      )}
                    </select>
                    <hr />
                    <button
                      className="pull-right jose_theme"
                      disabled={!purchaseInfoComplete}
                      onClick={() => this.handleOrderBeingPlaced(comic.id)}
                    >
                      Place Order
                    </button>
                    <button
                      className="pull-left jose_theme"
                      onClick={() => this.handleBuyNowModalClosed()}
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="col-md-6">
                    <img
                      className="modal_order_thumbnail"
                      src={comic.thumbnail.pathIncludingExtension}
                      alt=""
                    />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>

          <div className="col-md-12">
            {largeComicRendered}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="row jose_row">
          {this.state.issuesList.map(item =>
            this.renderComicPreview(
              item.id,
              item.title,
              item.seriesNumber,
              item.publisher,
              item.thumbnail,
            ),
          )}
        </div>

        <div className="row">
          {largeComicDiv}
        </div>
      </div>
    );
  }
}

export default ComicIssuesContainer;
