import {
    configureStore,
    combineReducers,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { cartReducer } from './cart.slice';
import { dateReducer } from './dates.slice';

const reducer = {
    cart: cartReducer,
    dates: dateReducer,
};

const combineReducer = combineReducers({
    cart: cartReducer,
    dates: dateReducer,
});

const rootReducer = (state, action) => {
    return combineReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
});

export default store;
