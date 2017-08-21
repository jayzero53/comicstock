/*
Issue module
*/

import './index.css';
import {Carousel} from 'react-bootstrap'
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

    let large_comic_image = (<img src={images} alt="" />);
    if (images.length > 1)
        large_comic_image = (
            <Carousel>
                {
                    images.map((image) =>
                        <Carousel.Item>
                            <img src={image} alt="" />
                        </Carousel.Item>
                    )
                }
            </Carousel>
        );

    return(
        <div>
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
                    <h2>Published: {date.toLocaleDateString('en-GB', {day : 'numeric', month : 'long', year : 'numeric'})}</h2>
                </div>
                <hr/>
                <div>
                    <strong>{props.description}</strong>
                </div>

                <br />

                <button className="col-md-3 jose_theme" onClick={() => props.buyButtonHandler(props.id)}>
                    Buy now
                </button>
            </div>

            <div className="col-md-5 big-comic">
                {large_comic_image}
            </div>
        </div>
    )
}

export {
    Issue,
    BigComic
};