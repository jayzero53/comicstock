import React, {Component} from 'react';
import './index.css';
import axios from 'axios';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import Supplier from './Supplier.js';
import Issue from './Issue.js';

const API_URL = 'http://frontendshowcase.azurewebsites.net/api/';

class ComicIssues extends Component{

    constructor(){
        super();
        this.state = {
            issuesList: [],
        };
    }

    componentDidMount(){

        axios.get(API_URL + 'Issues')
        .then(
            (response) => {
                this.setState({issuesList: response.data})
            }
        )
        .catch(
            function (error) {
                console.log(error);
            }
        )
    }

    static renderIssue(id, title, description, seriesNumber, publicationDate, publisherId, publisher,
                       // creators,
                       // stock,
                       thumbnail,
                       // images,
                       ){
        return (
            <Issue
                key={id}

                title={title}
                description={description}
                seriesNumber={seriesNumber}
                publicationDate={publicationDate}
                publisherId={publisherId}
                publisher={publisher}
                // creators={creators}
                // stock={stock}
                thumbnail={thumbnail}
                // images={images}

                // onClick={() => this.props.onClick(i)}
            />
        );
    }

    render (){
        return(
            <div>
                {
                    this.state.issuesList.map((item, index) => (
                        ComicIssues.renderIssue(
                            item.id,
                            item.title,
                            item.description,
                            item.seriesNumber,
                            item.publicationDate,
                            item.publisherId,
                            item.publisher,
                            // item.creators,
                            // item.stock,
                            item.thumbnail,
                            // item.images,
                        )
                    ))
                }
            </div>
        );
    }
}

class ComicSuppliers extends Component{

    constructor(){
        super();
        this.state = {
            suppliersList: [],
        };
    }

    componentDidMount(){

        axios.get(API_URL + 'Suppliers')
            .then(
                (response) => {
                    // TODO: Dedupe
                    this.setState({suppliersList: response.data})
                }
            )
            .catch(
                function (error) {
                    console.log(error);
                }
            );
    }

    static renderSupplier(id, name, city, reference) {
        return (
            <Supplier
                key={id}
                name={name}
                city={city}
                reference={reference}
            />
        );
    }

    render (){
        return(
            <div>
            {
                this.state.suppliersList.map((item, index) => (
                    ComicSuppliers.renderSupplier(
                        item.id,item.name,item.city,item.reference
                    )
                ))
            }
            </div>

        );
    }
}


// =================================

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/issues' component={Issues}/>
            <Route path='/suppliers' component={Suppliers}/>
        </Switch>
    </main>
);

const Home = () => (
    <div>
        <h1>Click a link other than home!</h1>
    </div>
);

const Issues = () => (
    <Switch>
        <Route exact path='/issues' component={ComicIssues}/>
    </Switch>
);

const Suppliers = () => (
    <Switch>
        <Route exact path='/suppliers' component={ComicSuppliers}/>
    </Switch>
);

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/issues'>Issues</Link></li>
                <li><Link to='/suppliers'>Suppliers</Link></li>
            </ul>
        </nav>
    </header>
);

const App = () => (
    <div>
        <Header />
        <Main />
    </div>
);

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
