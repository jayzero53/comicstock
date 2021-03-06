import axios from 'axios';

import { API_ISSUES_URL, API_ORDERS_URL, API_SUPPLIERS_URL } from './Constants';

function fetchData(url) {
  return axios.get(url).then(response => response.data).catch(error => {
    console.error(error);
  });
}

function getSuppliers() {
  return fetchData(API_SUPPLIERS_URL);
}

function getIssues() {
  return fetchData(API_ISSUES_URL);
}

function getOrders() {
  return fetchData(API_ORDERS_URL);
}

function postToOrdersAPI(comicID, quality, supplierID) {
  const url = `${API_ORDERS_URL + supplierID}/issues/${comicID}/Put`;
  return axios.put(url).then(response => response).catch(error => error);
}

export { getSuppliers, getIssues, getOrders, postToOrdersAPI };
