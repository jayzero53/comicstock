import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

import Supplier from './Supplier.js';

const API_URL = 'http://frontendshowcase.azurewebsites.net/api/';


class ComicListThing extends Component{

    constructor(){
        super();
        this.state = {
            suppliersList: []
        };
    }

    componentDidMount(){

        axios.get(API_URL + 'Suppliers')
        .then(
            (response) => {
                this.setState({suppliersList: response.data})
            }
        )
        .catch(
            function (error) {
                console.log(error);
            }
        )
    }

    static renderSupplier(id, name, city, reference) {

        return (
            <Supplier
                id={id}
                name={name}
                city={city}
                reference={reference}
            />
        );
    }

    render (){
        console.log(this.state.suppliersList);

        return(
            <div>
                <div>
                    {
                        this.state.suppliersList.map((item, index) => (
                            ComicListThing.renderSupplier(
                                item.id,item.name,item.city,item.reference
                            )
                        ))
                    }
                </div>
            </div>
        );
    }
}

// =================================

ReactDOM.render(<ComicListThing />, document.getElementById('root'));
