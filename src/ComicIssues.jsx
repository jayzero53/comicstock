import React, {Component} from 'react';
import './index.css';

import {Issue} from './Issue.jsx';
import {getIssues, getSuppliers, postToOrdersAPI} from "./ApiTools";
import {BigComic} from "./Issue";
import {Modal} from "react-bootstrap";
import {ISSUE_QUALITY_OPTIONS, MIN_ITEMS_PER_ORDER} from './Constants'

class ComicIssues extends Component{

    constructor(){
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
            }

        };
    }

    componentDidMount(){
        getIssues()
        .then(
            (issues) => {
                this.setState({issuesList: issues})
            }
        );

        getSuppliers()
        .then(
            (suppliers) => {
                this.setState({suppliersList: suppliers})
            }
        )
    }

    returnComicWithID(comicID){
        for(let i=0; i<this.state.issuesList.length; i++){
            let comic = this.state.issuesList[i];
            if (comic.id === comicID){
                return comic
            }
        }
    }

    orderComic(comicID, quality, supplierID){
        postToOrdersAPI(comicID, quality, supplierID)
    }

    onMiniComicClick(comicID) {
        this.setState({
            selectedIssue: comicID,
        });
    };

    renderLargeComic(comicID, buyButtonHandler){
        let comic =  this.returnComicWithID(comicID);
        return (
            <BigComic
                key={comic.title}
                title={comic.title}
                images={comic.images}
                publisher={comic.publisher}
                publicationDate={comic.publicationDate}
                description={comic.description}
                buyButtonHandler={buyButtonHandler.bind(this)}
            />
        );
    }

    renderComicPreview(
        id,
        title,
        seriesNumber,
        publisher,
        thumbnail,
    ){
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

    handleBuyNowClicked(){
        this.setState({buyNowClicked: true})
    }

    handleBuyNowModalClosed(){
        this.setState({
            buyNowClicked: false,
            comicOrder: {
                comicID: null,
                quality: null,
                quantity: null,
            }
        })
    }

    handleQuantityChange(event){
        let quantity = event.target.value;
        let currentOrder = this.state.comicOrder;
        currentOrder.quantity = quantity;
        this.setState({comicOrder: currentOrder});
    }

    handleOrderBeingPlaced(comicID){
        let currentOrder = this.state.comicOrder;
        currentOrder.comicID = comicID;
        currentOrder.quantity = currentOrder.quantity || MIN_ITEMS_PER_ORDER;
        this.setState({comicOrder: currentOrder});

        currentOrder = this.state.comicOrder;
        for (let i=0; i<currentOrder.quantity;i++){
            this.orderComic(currentOrder.comicID, currentOrder.quality, currentOrder.supplierID)
        }

        this.setState({
            buyNowClicked: false,
            comicOrder: {
                comicID: null,
                quality: null,
                quantity: null,
            }
        });
    }

    handleSupplierSelected(event){
        let supplier = event.target.value;
        let currentOrder = this.state.comicOrder;
        currentOrder.supplierID = supplier;
        this.setState({comicOrder: currentOrder});
    }

    handleQualitySelected(event){
        let quality = event.target.value;
        let currentOrder = this.state.comicOrder;
        currentOrder.quality = quality;
        this.setState({comicOrder: currentOrder});
    }

    render (){

        let comic, largeComicRendered, largeComicDiv;

        if (this.state.selectedIssue){
            comic = this.returnComicWithID(this.state.selectedIssue);
            largeComicRendered = this.renderLargeComic(comic.id, this.handleBuyNowClicked);
            largeComicDiv = (
                <div className="col-md-12">
                    <div>
                        <Modal show={this.state.buyNowClicked}>
                            <Modal.Header>
                                <h3>{comic.title}</h3>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p>How many copies would you like?</p>
                                        <input className="jose_theme" onChange={this.handleQuantityChange.bind(this)} type="number" defaultValue={String(MIN_ITEMS_PER_ORDER)} min={String(MIN_ITEMS_PER_ORDER)}/>
                                        <hr />
                                        <p>Please select your preferred quality</p>
                                        <select onChange={this.handleQualitySelected.bind(this)} required={true}>
                                            <option selected disabled>Preferred quality...</option>
                                            {
                                                ISSUE_QUALITY_OPTIONS.map(
                                                    (qualityOption, _) => (
                                                        <option className="jose_theme" value={qualityOption}>{qualityOption}</option>
                                                    )
                                                )
                                            }
                                        </select>
                                        <hr />
                                        <p>Please select your preferred supplier</p>
                                        <select onChange={this.handleSupplierSelected.bind(this)} required={true}>
                                            <option selected disabled>Preferred supplier...</option>
                                            {
                                                this.state.suppliersList.map(
                                                    (supplier, _)=>(
                                                        <option className="jose_theme" value={supplier.id}>{supplier.name}</option>
                                                    )
                                                )
                                            }
                                        </select>
                                        <hr />
                                        <button className="pull-right jose_theme" onClick={()=>this.handleOrderBeingPlaced.bind(this)(comic.id)}>Place Order</button>
                                        <button className="pull-left jose_theme" onClick={()=> this.handleBuyNowModalClosed()}>Cancel</button>
                                    </div>

                                    <div className="col-md-6">
                                        <img className="modal_order_thumbnail" src={comic.thumbnail.pathIncludingExtension} alt="" />
                                    </div>

                                </div>
                            </Modal.Body>

                        </Modal>
                    </div>

                    <div className="col-md-12">
                        {largeComicRendered}
                    </div>
                </div>)
            }

        return(
            <div>
                <div className="row jose_row">
                {
                    this.state.issuesList.map((item, index) => (
                        this.renderComicPreview(
                            item.id,
                            item.title,
                            item.seriesNumber,
                            item.publisher,
                            item.thumbnail,
                        )
                    ))
                }
                </div>

                <div className="row">
                    {largeComicDiv}
                </div>
            </div>
        );
    }
}

export default ComicIssues;