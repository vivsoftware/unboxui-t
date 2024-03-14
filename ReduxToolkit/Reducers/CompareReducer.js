import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    compareProducts: [],
    compareModel: false
};

export const CompareReducer = createReducer(initialState, {
    'CHANGECOMPARE': (state, action) => {
        const productId = action.payload.id;
        const productIndex = state.compareProducts.findIndex((product) => product.id === productId);
        if (productIndex === -1) {
            state.compareProducts = [...state.compareProducts ,action.payload]
        }
    },
    'REMOVEFROMCOMPARE':(state, action)=>{
        const productId = action.payload.id;
        state.compareProducts = state.compareProducts.filter((compare)=> compare.id != productId)
    },
    'IS_MODAL_CP':(state,action)=>{
        state.compareModel = !state.compareModel;
    }
});