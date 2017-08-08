/*
Supplier module
*/
import React from 'react';

class Supplier extends React.Component{

    constructor (id, name, city, reference){
        super();
        this.state = {
            id: id,
            name: name,
            city: city,
            reference: reference,
        }
    }

    render () {
        return(
            <div>
                <div>{this.state.id}</div>
                <div>{this.state.name}</div>
                <div>{this.state.city}</div>
                <div>{this.state.reference}</div>
            </div>
        )
    }
}