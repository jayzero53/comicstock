/*
Supplier module
*/
import React from 'react';
import PropTypes from 'prop-types';

import editIcon from '../images/icons8-Edit-40.png';
import deleteIcon from '../images/icons8-Trash Can-40.png';
import confirm from '../Utils/Confirm';

function ComicSupplierComponent(props) {
  return (
    <div className="col-md-4 panel panel-default">
      <address>
        <strong>
          {props.name}
        </strong>
        <br />
        {props.city}
        <br />
        {props.reference}
        <br />
        <div className="text-right">
          <button
            className="no-button-theme"
            onClick={() => props.editHandler(props.id)}
          >
            <img
              className="padded_by_ten button_icon"
              src={editIcon}
              alt="edit"
            />
          </button>

          <button
            className="no-button-theme"
            onClick={() => {
              confirm('Delete this supplier?').then(
                () => {
                  /* proceed */
                  props.deleteHandler(props.id);
                },
                () => {
                  /* cancel: do nothing */
                },
              );
            }}
          >
            <img
              className="padded_by_ten button_icon"
              src={deleteIcon}
              alt="delete"
            />
          </button>
        </div>
      </address>
    </div>
  );
}

ComicSupplierComponent.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  reference: PropTypes.string.isRequired,
  editHandler: PropTypes.func.isRequired,
};

export default ComicSupplierComponent;
