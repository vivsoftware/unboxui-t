// import { FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from "./actionType";


export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const initialState = {
    userDe: [],
    error: null,
};

const actionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return {
             ...state,
                userDe: action.payload,
            };
        case FETCH_USERS_FAILURE:
            return {
             ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default actionReducer;