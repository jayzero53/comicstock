/*
Supplier module
*/
import React from 'react';
import editIcon from './static/icons8-Edit-40.png'
import saveIcon from './static/icons8-Save-40.png'
import deleteIcon from './static/icons8-Trash Can-40.png'

function Supplier(props){
    return(
        <div className="supplier">
            <h2>{props.id}</h2>
            <h2>{props.name}</h2>
            <h2>{props.city}</h2>
            <h2>{props.reference}</h2>
            <div className="rightAligned">
                <img
                    className="padded_by_ten button_icon"
                    src={editIcon}
                    alt="edit"
                    onClick={() => props.editHandler(props.id)}
                />
                <img
                    className="padded_by_ten button_icon"
                    src={saveIcon}
                    alt="save"
                    onClick={() => props.saveHandler(props.id)}
                />
                <img
                    className="padded_by_ten button_icon"
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => props.deleteHandler(props.id)}
                />
            </div>
        </div>
    );
}

export default Supplier;