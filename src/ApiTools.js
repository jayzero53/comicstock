import axios from 'axios';
import {API_ISSUES_URL, API_ORDERS_URL, API_SUPPLIERS_URL} from "./Constants";

function fetchData(url){
    return (
        axios.get(url)
        .then(
            (response) => {
                return response.data;
            }
        )
        .catch(
            function (error) {
                console.log(error);
            }
        )
    );
}

function getSuppliers(){
    return fetchData(API_SUPPLIERS_URL);
}

function getIssues(){
    return fetchData(API_ISSUES_URL)
}

function getOrders(){
    return fetchData(API_ORDERS_URL)
}

export {
    getSuppliers,
    getIssues,
    getOrders,
};
