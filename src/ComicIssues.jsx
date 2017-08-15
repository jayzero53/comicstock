import React, {Component} from 'react';
import './index.css';

import Issue from './Issue.jsx';
import {getIssues} from "./ApiTools";


class ComicIssues extends Component{

    constructor(){
        super();
        this.state = {
            issuesList: [],
            selectedIssue: null,
        };
        // this.onMiniComicClick = this.onMiniComicClick.bind(this)
    }

    componentDidMount(){
        getIssues()
        .then(
            (issues) => {
                this.setState({issuesList: issues})
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

    renderIssue(
        id,
        title,
        seriesNumber,
        publisher,
        thumbnail,
        clickhandler
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

    render (){

        let comic, comicRendered;

        if (this.state.selectedIssue){
            comic = this.returnComicWithID(this.state.selectedIssue);
            console.log('comic')
            console.log(comic)
            comicRendered = this.renderIssue(
                comic.id,
                comic.title,
                comic.seriesNumber,
                comic.publisher,
                comic.thumbnail,
            );
            }

        return(
            <div className="row">
                {
                    this.state.issuesList.map((item, index) => (
                        this.renderIssue(
                            item.id,
                            item.title,
                            item.seriesNumber,
                            item.publisher,
                            item.thumbnail,
                            this.onMiniComicClick,
                        )
                    ))
                }
                <div className="col-md-12">
                    {comicRendered}
                </div>
            </div>
        );
    }
}

export default ComicIssues;