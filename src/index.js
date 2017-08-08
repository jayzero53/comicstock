import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Supplier from './Supplier.js';


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

class ComicListThing extends React.Component{

    renderSupplier(id, name, city, reference) {

        console.log('id: ' + id);
        console.log('name: ' + name);
        console.log('city: ' + city);
        console.log('reference: ' + reference);
        console.log('\n');

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
        console.log('main render');
        return(
            <div>
                <div>
                    {
                        this.renderSupplier(
                            6,
                            "Barfropazz Direct Corp.",
                            "Dayton",
                            "XY9NY9590GWC0JS",
                        )
                    }
                </div>

                <div>
                    {
                        this.renderSupplier(
                            15,
                            "Bartanaquazz International ",
                            "Montgomery",
                            "JHMIYDGF9EE0F42",
                        )
                    }
                </div>

                <div>
                    {
                        this.renderSupplier(
                            21,
                            "Cipjubicor Holdings ",
                            "Stockton",
                            "RGEILW3BN72K7P4",
                        )
                    }
                </div>
            </div>
        );
    }
}

// =================================

ReactDOM.render(<ComicListThing />, document.getElementById('root'));
