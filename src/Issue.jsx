/*
Issue module
*/
import './index.css';


import React from 'react';

function Issue(props){
    return(
        <div className="issue col-md-2" onClick={() => props.clickHandler(props.id)}>
            <div>
                <h3>{props.publisher}</h3>
            </div>
            <div>
                <h2>{props.publicationDate}</h2>
            </div>
            <div>
                <h2>{props.description}</h2>
            </div>
            <div>
                <img className="comic_book_thumbnail" src={props.thumbnail.pathIncludingExtension} alt="thumbnail"/>
            </div>

            <div height="50px">
                <strong>{props.title}</strong>
            </div>
        </div>
    );
}

function BigComic(props){

    let images = [];
    props.images.forEach(function(image){
        images.push(image.pathIncludingExtension)
    });

    return(
        <div>
            <div className="col-md-5 big-comic">
                {/* TODO: Cycle through these*/}
                <img src={images}/>
            </div>
            <div className="col-md-7">
                <div>{props.title}</div>
                <div>{props.publisher}</div>
                <div>{props.publicationDate}</div>
                <div>{props.description}</div>
            </div>
        </div>
    )
}

export {
    Issue,
    BigComic
};