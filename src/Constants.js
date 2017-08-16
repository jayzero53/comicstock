const API_BASE_URL = 'http://frontendshowcase.azurewebsites.net/api/';

const API_SUPPLIERS_ENDPOINT = 'Suppliers/';
const API_ISSUES_ENDPOINT = 'Issues/';
const API_ORDERS_ENDPOINT = 'Orders/';

const API_SUPPLIERS_URL = API_BASE_URL + API_SUPPLIERS_ENDPOINT;
const API_ISSUES_URL = API_BASE_URL + API_ISSUES_ENDPOINT;
const API_ORDERS_URL = API_BASE_URL + API_ORDERS_ENDPOINT;

const APP_HOME = '/';

const APP_SUPPLIERS_URL = APP_HOME + 'suppliers/';
const APP_SUPPLIERS_ADD_URL = APP_SUPPLIERS_URL + 'add/';
const APP_SUPPLIERS_EDIT_URL = APP_SUPPLIERS_URL +  'edit/';

const APP_ISSUES_URL = APP_HOME + 'issues/';

const PAGINATION_ITEMS_PER_PAGE = 6;

const ISSUE_QUALITY_OPTIONS = [
    'Mint',
    'NearMintMint',
    'NearMint',
    'VeryFineNearMint',
    'VeryFine',
    'FineVeryFine',
    'Fine',
    'VeryGoodFine',
    'VeryGood',
    'GoodVeryGood',
    'Good',
    'FairGood',
    'Fair',
    'Poor'
];

export  {
    API_BASE_URL,
    API_SUPPLIERS_URL,
    API_ISSUES_URL,
    API_ORDERS_URL,

    APP_HOME,

    APP_SUPPLIERS_URL,
    APP_SUPPLIERS_ADD_URL,
    APP_SUPPLIERS_EDIT_URL,

    APP_ISSUES_URL,

    PAGINATION_ITEMS_PER_PAGE,
    ISSUE_QUALITY_OPTIONS,
};
