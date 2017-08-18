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
        console.log('comicID');
        console.log(comicID);

        this.setState({
            selectedIssue: comicID,
        });

        let found = this.returnComicWithID(comicID);
        console.log('found');
        console.log(found)
    };

    renderLargeComic(comicID){
        let comic =  this.returnComicWithID(comicID);
        return (
            <BigComic
                key={comic.title}
                title={comic.title}
                images={comic.images}
                publisher={comic.publisher}
                publicationDate={comic.publicationDate}
                description={comic.description}
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

    handleBuyNowModalClosed(event){
        console.log('event.target');
        console.log(event.target);

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
        console.log(this.state.comicOrder)
    }

    handleOrderBeingPlaced(comicID){
        let currentOrder = this.state.comicOrder;
        currentOrder.comicID = comicID;
        currentOrder.quantity = currentOrder.quantity || MIN_ITEMS_PER_ORDER;
        this.setState({comicOrder: currentOrder});
        console.log(this.state.comicOrder);

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
        console.log('supplierID:');
        console.log(event.target.value);
        let supplier = event.target.value;
        let currentOrder = this.state.comicOrder;
        currentOrder.supplierID = supplier;
        this.setState({comicOrder: currentOrder});
    }

    handleQualitySelected(event){
        console.log('quality');
        console.log(event.target.value);

        let quality = event.target.value;
        let currentOrder = this.state.comicOrder;
        currentOrder.quality = quality;
        this.setState({comicOrder: currentOrder});
    }

    render (){

        let comic, largeComicRendered, htmlParts;

        if (this.state.selectedIssue){
            comic = this.returnComicWithID(this.state.selectedIssue);
            largeComicRendered = this.renderLargeComic(comic.id);
            htmlParts = (
                <div>
                    <div>
                        {largeComicRendered}
                    </div>

                    <div>
                        <Modal show={this.state.buyNowClicked}>
                            <Modal.Header><h3>{comic.title}</h3></Modal.Header>

                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-6">

                                        <p>How many?</p>
                                        <input onChange={this.handleQuantityChange.bind(this)} type="number" defaultValue={String(MIN_ITEMS_PER_ORDER)} min={String(MIN_ITEMS_PER_ORDER)}/>

                                        <p>Preferred quality?</p>
                                        <select onChange={this.handleQualitySelected.bind(this)} required={true}>
                                            <option selected disabled>Choose quality preference...</option>
                                            {
                                                ISSUE_QUALITY_OPTIONS.map(
                                                    (qualityOption, _) => (
                                                        <option value={qualityOption}>{qualityOption}</option>
                                                    )
                                                )
                                            }
                                        </select>

                                        <p>Supplier</p>
                                        <select onChange={this.handleSupplierSelected.bind(this)} required={true}>
                                            <option selected disabled>Choose supplier...</option>
                                            {
                                                this.state.suppliersList.map(
                                                    (supplier, _)=>(
                                                        <option value={supplier.id}>{supplier.name}</option>
                                                    )
                                                )
                                            }
                                        </select>

                                        <br/>

                                        <button onClick={()=>this.handleOrderBeingPlaced.bind(this)(comic.id)}>Place Order</button>
                                        <button onClick={(e)=> this.handleBuyNowModalClosed(e)}>Cancel</button>
                                    </div>

                                    <div className="col-md-6">
                                        <img className="comic_book_thumbnail" src={comic.thumbnail.pathIncludingExtension} alt="" />
                                    </div>

                                </div>
                            </Modal.Body>

                        </Modal>

                        <button className="col-md-1" onClick={() => this.handleBuyNowClicked(comic.id)}>
                            Buy now
                        </button>
                    </div>
                </div>)
            }

        return(
            <div>
                <div className="row">
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
                    {htmlParts}
                </div>
            </div>
        );
    }
}

export default ComicIssues;