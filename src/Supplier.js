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
            <h2>{props.name}</h2>
            <h2>{props.city}</h2>
            <h2>{props.reference}</h2>
            <div className="rightAligned">
                <img
                    className="padded_by_ten button_icon"
                    src={editIcon}
                    alt="edit"
                    onClick={() => alert('edit on supplier ' + props.name)}
                />
                <img
                    className="padded_by_ten button_icon"
                    src={saveIcon}
                    alt="save"
                    onClick={() => alert('save on supplier ' + props.name)}
                />
                <img
                    className="padded_by_ten button_icon"
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => alert('delete on supplier ' + props.name)}
                />
            </div>
        </div>
    );
}

export default Supplier;