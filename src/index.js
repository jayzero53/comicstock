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
                this.setState({suppliersList: response.data})
            }
        )
        .catch(
            function (error) {
                console.log(error);
            }
        );
    }

    renderSupplier(key, id, name, city, reference, editHandler, saveHandler, deleteHandler) {
        return (
            <Supplier
                key={key}
                id={id}
                name={name}
                city={city}
                reference={reference}

                editHandler={editHandler}
                saveHandler={saveHandler}
                deleteHandler={deleteHandler}
            />
        );
    }

    editSupplier(supplierID){
        return alert('Editing ' + supplierID)
    }

    saveSupplier(supplierID){
        return alert('Saving ' + supplierID)
    }

    deleteSupplier(supplierID){

        console.log('Deleting: ' + supplierID);
        let supplierUrl = API_URL + 'Suppliers/'+ supplierID;
        console.log('url: '+ supplierUrl);

        axios.delete(
            supplierUrl
        )
        .then(
            (response) => {
                console.log('response data: '+response.data);
                this.setState({suppliersList: response.data})
            }
        )
        .catch (
            function (error) {
                console.log('error: '+error)
            }
        );
        console.log('Deleted ' + supplierID)
    }

    render (){
        return(
            <div>

                <div>
                    <Link to={'/suppliers/add'}>Add new</Link>
                </div>

                <div>
                {
                    this.state.suppliersList.map((item, index) => (
                        this.renderSupplier(
                            index,
                            item.id,
                            item.name,
                            item.city,
                            item.reference,
                            this.editSupplier,
                            this.saveSupplier,
                            this.deleteSupplier,
                        )
                    ))
                }
                </div>
            </div>
        );
    }
}

class SupplierForm extends Component{
    constructor(){
        super();
        this.state = {
            city: '',
            name: '',
            reference: '',
        };

        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleReferenceChange = this.handleReferenceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCityChange(event) {
        this.setState({
            city: event.target.value,
        });
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value,
        });
    }

    handleReferenceChange(event) {
        this.setState({
            reference: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(
            API_URL + 'Suppliers',
            {
                city: this.state.city,
                name: this.state.name,
                reference: this.state.reference,
            }
        )
        .then(
            (result) => {
                console.log(result.data);
            }
        )
        .catch(
            function (error) {
                console.log(error);
            }
        );

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>City</td>
                            <td>
                                <label>
                                    <input type="text" value={this.state.city} onChange={this.handleCityChange} />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Name:
                            </td>
                            <td>
                                <label>
                                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Reference:
                            </td>
                            <td>
                                <label>
                                    <input type="text" value={this.state.reference} onChange={this.handleReferenceChange} />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value="Submit" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }
}

// =================================

//<editor-fold desc="My fold area">
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/issues' component={Issues}/>
            <Route path='/suppliers/add' component={SuppliersAdd}/>
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

const SuppliersAdd = () => (
    <Switch>
        <Route exact path='/suppliers/add' component={SupplierForm}/>
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

//</editor-fold>
