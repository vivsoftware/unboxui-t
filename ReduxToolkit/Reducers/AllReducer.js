import { createReducer } from "@reduxjs/toolkit";
const Values = {
    Is_Search: false,
    Is_Focus: false
}
export const CommonReducer = createReducer(Values, {
    'IS_SEARCH': (state, action) => {
        state.Is_Search = !state.Is_Search
    },
    'IS_FOCUS': (state, action) => {
        state.Is_Focus = action.payload
    }
}
)