
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_NEWS_API_URL;

const createRequest = (url) => ({ url});
// 
export const cryptoNewsApi = createApi({
	reducerPath: 'cryptoNewsApi',
	baseQuery: fetchBaseQuery({
		baseUrl,
		onError: (error) => {
			console.error('API Error:', error);
		},
	}),
	endpoints: (builder) => ({
		getCryptosNews: builder.query({
			query: ({ categories, count}) => createRequest(`/data/v2/news/?categories=${categories}`),

		}),
	}),
});

export const {
	useGetCryptosNewsQuery,
} = cryptoNewsApi;