

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headerApi = {
  "x-rapidapi-host": process.env.REACT_APP_CRYPTO_API_HOST,
  "x-rapidapi-key": process.env.REACT_APP_CRYPTO_API_KEY,
};


const baseUrl = process.env.REACT_APP_CRYPTO_API_BASE_URL ;


const createRequest  = (url)=>({url, headers: headerApi})

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        //all cryptocurrency
        getCryptos: builder.query({
            query: (uptoCount)=> createRequest(`/coins?limit=${uptoCount}&referenceCurrencyUuid=6mUvpzCc2lFo`)
        }),
        //each crypto details
        getCryptoDetails: builder.query({
            query: (coinId)=> createRequest(`/coin/${coinId}?referenceCurrencyUuid=6mUvpzCc2lFo`)
        }),
        //history
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod})=> createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}&referenceCurrencyUuid=6mUvpzCc2lFo`)
        })
    })
})


export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
}= cryptoApi;



// var options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       tiers: '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//       'x-rapidapi-key': 'fb49546cdbmshd4a2fdd3c65720dp1903f6jsn72e39bdb0301'
//     }
//   };
