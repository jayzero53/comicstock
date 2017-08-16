import React, {Component} from 'react';
import './index.css';

import {Issue} from './Issue.jsx';
import {getIssues, getSuppliers} from "./ApiTools";
import {BigComic} from "./Issue";
import Modal from "react-bootstrap/es/Modal";
import {ISSUE_QUALITY_OPTIONS} from './Constants'

class ComicIssues extends Component{

    constructor(){
        super();
        this.state = {
            issuesList: [],
            suppliersList: [],
            selectedIssue: null,
            buyNowClicked: false,
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

    handleBuyNowClicked(comicID){
        console.log('buying comic');
        console.log(comicID);
        this.setState({buyNowClicked: true})
    }

    handleBuyNowModalClosed(){
        this.setState({buyNowClicked: false})
    }

    handleQuantityChange(event){
        this.setState({})
    }


    render (){

        let comic, comicRendered, htmlParts;

        if (this.state.selectedIssue){
            comic = this.returnComicWithID(this.state.selectedIssue);
            comicRendered = this.renderLargeComic(comic.id);
            htmlParts = (
                <div>
                    <div>
                        {comicRendered}
                    </div>

                    <div>
                        <Modal show={this.state.buyNowClicked} >
                            <img className="comic_book_thumbnail" src={comic.thumbnail.pathIncludingExtension} alt="" />

                            <p>How many?</p>
                            <input type="number" min="1" onChange={this.handleQuantityChange.bind(this)}/>
                            <p>Preferred quality?</p>
                            <select>
                                {
                                    ISSUE_QUALITY_OPTIONS.map(
                                        (qualityOption, _) => (
                                            <option value={qualityOption}>{qualityOption}</option>
                                        )
                                    )
                                }
                            </select>
                            <p>Supplier</p>
                            <select>
                                {
                                    this.state.suppliersList.map(
                                        (supplier, _)=>(
                                            <option value={supplier.name}>{supplier.name}</option>
                                        )
                                    )
                                }
                            </select><br/>

                            <button onClick={()=> this.handleBuyNowModalClosed()}>Place Order</button>
                            <button onClick={()=> this.handleBuyNowModalClosed()}>Cancel</button>

                        </Modal>

                        <button className="col-md-6" onClick={() => this.handleBuyNowClicked(comic.id)}>
                            Buy now
                        </button>
                    </div>
                </div>)
            }

        return(
            <div className="row container">
                <div>
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
                {htmlParts}
            </div>
        );
    }
}

export default ComicIssues;