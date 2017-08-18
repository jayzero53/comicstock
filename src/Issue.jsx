/*
Issue module
*/

import './index.css';

import React from 'react';

function Issue(props){
    return(
        <div className="issue col-md-2" onClick={() => props.clickHandler(props.id)}>
            <div>
                <img className="comic_book_thumbnail" src={props.thumbnail.pathIncludingExtension} alt="thumbnail"/>
            </div>
            <div height="50px">
                <h4><strong>{props.title}</strong></h4>
            </div>
        </div>
    );
}

function BigComic(props){

    let images = [];
    props.images.forEach(function(image){
        images.push(image.pathIncludingExtension)
    });
    let date = new Date(props.publicationDate);

    return(
        <div>
            <div className="col-md-5 big-comic">
                {/* TODO: Cycle through these*/}
                <img src={images}/>
            </div>
            <div className="col-md-7">
                <div>
                    <h3><strong>{props.title}</strong></h3>
                </div>
                <hr/>
                <div>
                    <h3>{props.publisher}</h3>
                </div>
                <hr/>
                <div>
                    Published: {date.toLocaleDateString('en-GB', {day : 'numeric', month : 'long', year : 'numeric'})}
                </div>
                <hr/>
                <div>
                    {props.description}
                </div>
            </div>
        </div>
    )
}

export {
    Issue,
    BigComic
};