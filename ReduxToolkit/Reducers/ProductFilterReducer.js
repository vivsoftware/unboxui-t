import { createReducer } from "@reduxjs/toolkit";

const initialValue = {
    brand: [0, 50],
    color: [],
    price: [0, 300000],
    category: [],
    sorting: 'Select Sorting',
    discount: [],
    sortByType: [],
    all: []
}

export const ProductFilter = createReducer(initialValue, {
    "BRANDFILTER": (state, action) => {
        action.payload.checked ? state.brand.push(action.payload.value) : state.brand.splice(state.brand.indexOf(action.payload.value), 1)
    },
    "COLORFILTER": (state, action) => {
        state.color.includes(action.payload) ? state.color.splice(state.color.indexOf(action.payload), 1) : state.color.push(action.payload)
    },
    "PRICEFILTER": (state, action) => {
        if (Array.isArray(action.payload)) {
            state.price = [...action.payload]
        } else {
            action.payload ? (state.price = [...action.payload]) : state.price.splice(0, state.price.length);
        }
    },
    "CATEGORYFILTER": (state, action) => {
        action.payload.checked ? state.category.push(action.payload.value) : state.category.splice(state.category.indexOf(action.payload.value), 1)
    },
    "SORTINGFILTER": (state, action) => {
        state.sorting = action.payload
    },
    "BRAND": (state, action) => {
        if (Array.isArray(action.payload)) {
            state.brand = [...action.payload]
        } else {
            state.brand.includes(action.payload) ? state.brand.splice(state.brand.indexOf(action.payload), 1) : state.brand.push(action.payload)
        }
    },
    "COLOR": (state, action) => {
        if (Array.isArray(action.payload)) {
            state.color = [...action.payload]
        } else {
            state.color.includes(action.payload) ? state.color.splice(state.color.indexOf(action.payload), 1) : state.color.push(action.payload)
        }
    },
    "CATEGORY": (state, action) => {
        if (Array.isArray(action.payload)) {
            state.category = [...action.payload]
        } else {
            state.category.includes(action.payload) ? state.category.splice(state.category.indexOf(action.payload), 1) : state.category.push(action.payload)
        }
    },
    "DISCOUNTFILTER": (state, action) => {
        // state.discount = action.payload
        action.payload.checked ? state.discount.push(action.payload.value) : state.discount.splice(state.discount.indexOf(action.payload.value), 1)
    },
    "SORTBYTYPE": (state, action) => {
        state.sortByType = action.payload
    }
}
)