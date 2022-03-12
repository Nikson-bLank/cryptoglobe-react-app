import {configureStore} from "@reduxjs/toolkit";
import {cryptoApi} from "../services/cryptoApi";
import { cryptoExchangeApi } from "../services/cryptoExchangeApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer,
        [cryptoExchangeApi.reducerPath]:cryptoExchangeApi.reducer
    }
});