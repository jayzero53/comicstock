/*
Issue module
*/
import './index.css';


import React from 'react';

function Issue(props){
    return(
        <div className="issue">
            <h2>{props.id}</h2>
            <h2>{props.title}</h2>
            <h2>{props.publisher}</h2>
            {/*<h2>{props.publisherId}</h2>*/}
            {/*<h2>{props.seriesNumber}</h2>*/}
            <h2>{props.publicationDate}</h2>
            <h2>{props.description}</h2>
            {/*<h2>{props.creators}</h2>*/}
            {/*<h2>{props.stock}</h2>*/}
            {/*<h2>{props.thumbnail.path}</h2>*/}
            {/*<h2>{props.thumbnail.extension}</h2>*/}
            <img className="comic_book_thumbnail" src={props.thumbnail.pathIncludingExtension} alt="thumbnail"/>
            {/*<h2>{props.images}</h2>*/}
        </div>
    );
}

export default Issue;