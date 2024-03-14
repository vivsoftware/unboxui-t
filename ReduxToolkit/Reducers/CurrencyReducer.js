import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    currency: 'INR',
    name: 'rupees',
    symbol: '₹',
    currencyValue: 1,
};

export const CurrencyReducer = createReducer(initialState, {
    'CURRENCYCHANGE': (state, action) => {
        state.currency = action.payload.currency;
        state.name = action.payload.name;
        state.symbol = action.payload.symbol;
        state.currencyValue = action.payload.value;
    },
});