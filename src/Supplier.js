/*
Supplier module
*/
import React from 'react';

function Supplier(props){
    return(
        <div className="supplier">
            <h2>{props.id}</h2>
            <h2>{props.name}</h2>
            <h2>{props.city}</h2>
            <h2>{props.reference}</h2>
        </div>
    );
}

export default Supplier;