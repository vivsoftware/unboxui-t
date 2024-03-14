import { combineReducers } from "@reduxjs/toolkit";


const actionRoot = () => {
    return combineReducers({
        headerScroll: HeaderScroll,
        modal: ModalReducer,
        addToCart: AddToCartReducer,
        blog: BlogReducer,
        portfolio: PortfolioReducer,
        allGrids: AllGridReducer,
        productFilter: ProductFilter,
        common: CommonReducer,
        currency: CurrencyReducer,
        compare: CompareReducer,
        themeCustomizer: ThemeCustomizerReducer,
    });
}

export default actionRoot;


// app.js  

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './store';
// import App from './App';

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );