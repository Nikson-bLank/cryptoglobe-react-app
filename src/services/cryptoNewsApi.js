import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";

const newsHeaderApi= {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_CRYPTO_API_KEY
}

const baseUrl = process.env.REACT_APP_BING_NEWS_API_BASE_URL;


const createRequest = (url)=>{
    return {url, headers: newsHeaderApi}

}

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>{
        return {
            getCryptoNews: builder.query({
                query: ({newsCategory, uptoCount}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${uptoCount}`) 
            })
        }
    }
})
 

export const {
 useGetCryptoNewsQuery,
}= cryptoNewsApi


// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://bing-news-search1.p.rapidapi.com/news',
//   params: {safeSearch: 'Off', textFormat: 'Raw'},
//   headers: {
//     'x-bingapis-sdk': 'true',
//     'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
//     'x-rapidapi-key': 'fb49546cdbmshd4a2fdd3c65720dp1903f6jsn72e39bdb0301'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });