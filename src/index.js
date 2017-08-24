import React from 'react';
import { render } from 'react-dom';
import { Redirect, BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './index.css';
import ComicSuppliers from './ComicSupplierContainer';
import ComicIssues from './ComicIssuesContainer';
import ComicOrderComponent from './ComicOrdersContainer';
import { SupplierAddForm, SupplierEditForm } from './Forms';
import {
  APP_HOME,
  APP_ISSUES_URL,
  APP_ORDERS_URL,
  APP_SUPPLIERS_ADD_URL,
  APP_SUPPLIERS_EDIT_URL,
  APP_SUPPLIERS_URL,
} from './Constants';

const Home = () => <Redirect to={APP_ISSUES_URL} />;

const Issues = () =>
  <Switch>
    <Route exact path={APP_ISSUES_URL} component={ComicIssues} />
  </Switch>;

const Suppliers = () =>
  <Switch>
    <Route
      exact
      path={APP_SUPPLIERS_URL}
      component={ComicSuppliers}
      history={this.history}
    />
  </Switch>;

const SuppliersAdd = () =>
  <Switch>
    <Route exact path={APP_SUPPLIERS_ADD_URL} component={SupplierAddForm} />
  </Switch>;

const SuppliersEdit = () =>
  <Switch>
    <Route path={`${APP_SUPPLIERS_EDIT_URL}:id`} component={SupplierEditForm} />
  </Switch>;

const Orders = () =>
  <Switch>
    <Route
      exact
      path={APP_ORDERS_URL}
      component={ComicOrderComponent}
      history={this.history}
    />
  </Switch>;

const MainSection = () =>
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path={APP_HOME} component={Home} />
      <Route path={APP_ISSUES_URL} component={Issues} />
      <Route path={`${APP_SUPPLIERS_EDIT_URL}:id`} component={SuppliersEdit} />
      <Route path={APP_SUPPLIERS_ADD_URL} component={SuppliersAdd} />
      <Route path={APP_SUPPLIERS_URL} component={Suppliers} />
      <Route path={APP_ORDERS_URL} component={Orders} />
    </Switch>
  </main>;

const TopBar = () =>
  <header>
    <nav className="navbar navbar-default">
      <ul className="nav navbar-nav navbar-left">
        <li>
          <Link to={APP_ISSUES_URL}>Issues</Link>
        </li>
        <li>
          <Link to={APP_SUPPLIERS_URL}>Suppliers</Link>
        </li>
        <li>
          <Link to={APP_ORDERS_URL}>Orders</Link>
        </li>
      </ul>
    </nav>
  </header>;

const App = () =>
  <div className="comic-background">
    <TopBar />
    <MainSection />
  </div>;

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
