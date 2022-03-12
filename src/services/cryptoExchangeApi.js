import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const headerApi={
    'x-rapidapi-host': process.env.REACT_APP_EXCHANGE_API_HOST,
    'x-rapidapi-key': process.env.REACT_APP_CRYPTO_API_KEY
}

const baseUrl = process.env.REACT_APP_EXCHANGE_BASE_URL

const createRequest = (url)=>{
    return {url, headers: headerApi}
}

export const cryptoExchangeApi = createApi({
    reducerPath: "cryptoExchangeApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>{
        return {
            getCryptoExchange: builder.query({
                query : ()=>createRequest(`/exchanges`)
            })
        }
    }
})

export const { useGetCryptoExchangeQuery } = cryptoExchangeApi




// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://coingecko.p.rapidapi.com/exchanges',
//   headers: {
//     'x-rapidapi-host': 'coingecko.p.rapidapi.com',
//     'x-rapidapi-key': 'fb49546cdbmshd4a2fdd3c65720dp1903f6jsn72e39bdb0301'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });