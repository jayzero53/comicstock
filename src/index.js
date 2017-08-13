import React from 'react';
import { render } from 'react-dom'
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom'

import './index.css';
import ComicSuppliers from './ComicSuppliers'
import ComicIssues from './ComicIssues'
import {SupplierAddForm, SupplierEditForm} from "./forms";
import {
    APP_HOME, APP_ISSUES_URL, APP_SUPPLIERS_ADD_URL,
    APP_SUPPLIERS_EDIT_URL, APP_SUPPLIERS_URL
} from "./constants";

//<editor-fold desc="My fold area">
const Main = () => (
    <main>
        <Switch>
            <Route exact path={APP_HOME} component={Home}/>
            <Route path={APP_ISSUES_URL} component={Issues}/>
            <Route path={APP_SUPPLIERS_EDIT_URL + ':id'} component={SuppliersEdit}/>
            <Route path={APP_SUPPLIERS_ADD_URL} component={SuppliersAdd}/>
            <Route path={APP_SUPPLIERS_URL} component={Suppliers}/>
        </Switch>
    </main>
);

const Home = () => (
    <div>
        <h1>Click a link if you don't mind!</h1>
    </div>
);

const Issues = () => (
    <Switch>
        <Route exact path={APP_ISSUES_URL} component={ComicIssues}/>
    </Switch>
);

const Suppliers = () => (
    <Switch>
        <Route exact path={APP_SUPPLIERS_URL} component={ComicSuppliers}/>
    </Switch>
);

const SuppliersAdd = () => (
    <Switch>
        <Route exact path={APP_SUPPLIERS_ADD_URL} component={SupplierAddForm}/>
    </Switch>
);

const SuppliersEdit = () => (
    <Switch>
        <Route path={APP_SUPPLIERS_EDIT_URL + ':id'} component={SupplierEditForm}/>
    </Switch>
);

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to={APP_ISSUES_URL}>Issues</Link></li>
                <li><Link to={APP_SUPPLIERS_URL}>Suppliers</Link></li>
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
