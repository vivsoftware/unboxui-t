import { configureStore , combineReducers} from "@reduxjs/toolkit";
import { HeaderScroll } from "./Reducers/HeaderScroll";
import { ModalReducer } from "./Reducers/ModalReducer";
import { AddToCartReducer } from "./Reducers/AddtoCartReducer";
import { BlogReducer } from "./Reducers/BlogReducer";
import { PortfolioReducer } from "./Reducers/PortfolioReducer";
import { AllGridReducer } from "./Reducers/AllGridsReducer";
import { ProductFilter } from "./Reducers/ProductFilterReducer";
import { CommonReducer } from "./Reducers/AllReducer";
import { CurrencyReducer } from './Reducers/CurrencyReducer'
import { CompareReducer } from './Reducers/CompareReducer'
import { ThemeCustomizerReducer } from './Reducers/ThemeCustomizerReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { toastMiddleware } from './Reducers/AddtoCartReducer';

const rootReducer = combineReducers({
    HeaderScroll,
    ModalReducer,
    AddToCartReducer,
    BlogReducer,
    PortfolioReducer,
    AllGridReducer,
    ProductFilter,
    CommonReducer,
    CurrencyReducer,
    CompareReducer,
    ThemeCustomizerReducer,
    
});

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [toastMiddleware],
});

export const persistor = persistStore(store);