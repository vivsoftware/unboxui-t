import { createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
export const toastMiddleware = () => next => action => {
   
    const result = next(action);
    if (action.type == 'ADDTOCART') {
        toast.success(`Item Added to Cart`,{
            position: toast.POSITION.BOTTOM_CENTER,
          });
        
        
    } else if (action.type == 'REMOVEFROMCART') {
        toast.success(`Item Removed from Cart`,{
            position: toast.POSITION.BOTTOM_CENTER,
          });

    } else if (action.type == 'ADDTOWISHLIST') {
        console.log('ADDTOWISHLIST Payload:', action.payload);
        toast.success(`Item Added to Wishlist`,{
            position: toast.POSITION.BOTTOM_CENTER,
          });

    } else if (action.type == 'REMOVEFROMWISHLIST') {
        toast.success(`Item Removed from Wishlist`,{
            position: toast.POSITION.BOTTOM_CENTER,
          });

    } else if (action.type == 'CHANGECOMPARE') {
        toast.success(`Item Added to Compare`,{
            position: toast.POSITION.BOTTOM_CENTER,
          });

    } else if (action.type == 'REMOVEFROMCOMPARE') {
        toast.success(`Item Removed from Compare`,{
            position: toast.POSITION.BOTTOM_CENTER,
          });

    }

    return result;
}

export const AddToCartReducer = createReducer({ product: [], plusQty: 1, minusQty: 1, quantity: {}, isProduct: [], wishlist: [], allProducts: [] }, {
    'ADDTOCART': (state, action) => {
        // console.log(action.payload);
        const productId = action.payload.id;
        const productIndex = state.product.findIndex((product) => product.id === productId);
        if (productIndex === -1) {
            state.product = [...state.product, action.payload];
        }
    },
    'REMOVEFROMCART': (state, action) => {
        const productId = action.payload.id;
        state.product = state.product.filter((product) => product.id !== productId);
    },
    'PLUSQTY': (state, action) => {
        state.plusQty = action.payload;
    },
    'MINUSQTY': (state, action) => {
        state.minusQty = action.payload;
    },
    'ISPRODUCTINCART': (state, action) => {
        state.isProduct = action.payload;
    },
    'ADDTOWISHLIST': (state, action) => {
        const productId = action.payload.id;
        const productIndex = state.wishlist.findIndex((product) => product.id === productId);
        if (productIndex === -1) {
            state.wishlist = [...state.wishlist, action.payload];
        }
    },
    "ALLPRODUCT": (state, action) => {
        state.allProducts = action.payload

    }, "QUANTITY": (state, action) => {
        state.quantity = ({ ...state.quantity, [action.payload.id]: { qty: action.payload.qty, price: action.payload.price } })
        // console.log(state.quantity);
    },
    'REMOVEFROMWISHLIST': (state, action) => {
        const productId = action.payload.id;
        state.wishlist = state.wishlist.filter((product) => product.id !== productId);
    }

});