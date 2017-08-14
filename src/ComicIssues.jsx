import React, {Component} from 'react';
import './index.css';

import Issue from './Issue.jsx';
import {getIssues} from "./ApiTools";


class ComicIssues extends Component{

    constructor(){
        super();
        this.state = {
            issuesList: [],
        };
    }

    componentDidMount(){
        getIssues()
        .then(
            (issues) => {
                this.setState({issuesList: issues})
            }
        )
    }

    static renderIssue(
        id,
        title,
        description,
        seriesNumber,
        publicationDate,
        publisherId,
        publisher,
        // creators,
        // stock,
        thumbnail,
        // images,
    ){
        return (
            <Issue
                key={id}

                title={title}
                description={description}
                seriesNumber={seriesNumber}
                publicationDate={publicationDate}
                publisherId={publisherId}
                publisher={publisher}
                // creators={creators}
                // stock={stock}
                thumbnail={thumbnail}
                // images={images}

                // onClick={() => this.props.onClick(i)}
            />
        );
    }

    render (){
        return(
            <div>
                {
                    this.state.issuesList.map((item, index) => (
                        ComicIssues.renderIssue(
                            item.id,
                            item.title,
                            item.description,
                            item.seriesNumber,
                            item.publicationDate,
                            item.publisherId,
                            item.publisher,
                            // item.creators,
                            // item.stock,
                            item.thumbnail,
                            // item.images,
                        )
                    ))
                }
            </div>
        );
    }
}

export default ComicIssues;