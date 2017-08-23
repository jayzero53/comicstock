/*
Issue module
*/
import { Carousel } from 'react-bootstrap';
import React from 'react';

import './index.css';

function Issue(props) {
  return (
    <div
      className="issue col-md-2"
      onClick={() => props.clickHandler(props.id)}
      role="button"
    >
      <div>
        <img
          className="comic_book_thumbnail"
          src={props.thumbnail.pathIncludingExtension}
          alt="thumbnail"
        />
      </div>
      <div height="50px">
        <h4>
          <strong>
            {props.title}
          </strong>
        </h4>
      </div>
    </div>
  );
}

function BigComic(props) {
  const images = [];
  props.images.forEach(image => {
    images.push(image.pathIncludingExtension);
  });
  const date = new Date(props.publicationDate);

  let largeComicImage = <img src={images} alt="" />;
  if (images.length > 1)
    largeComicImage = (
      <Carousel>
        {images.map(image =>
          <Carousel.Item>
            <img src={image} alt="" />
          </Carousel.Item>,
        )}
      </Carousel>
    );

  return (
    <div>
      <div className="col-md-7">
        <div>
          <h2>
            <strong>
              {props.title}
            </strong>
          </h2>
        </div>
        <hr />
        <div>
          <h2>
            <strong>
              {props.publisher}
            </strong>
          </h2>
        </div>
        <hr />
        <div>
          <h3>
            <strong>
              Published:{' '}
              {date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </strong>
          </h3>
        </div>
        <hr />
        <div>
          <h3>
            <strong>
              {props.description}
            </strong>
          </h3>
        </div>

        <br />

        <button
          className="col-md-3 jose_theme"
          onClick={() => props.buyButtonHandler(props.id)}
        >
          Buy now
        </button>
      </div>

      <div className="col-md-5 big-comic">
        {largeComicImage}
      </div>
    </div>
  );
}

export { Issue, BigComic };
