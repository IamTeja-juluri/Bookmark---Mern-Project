import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getToken = (state) =>state.user.userInfo.accessToken

export const jsonServerApi = createApi({
  reducerPath: 'jsonServerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1',
  prepareHeaders: async (headers, { getState }) => {
    const token = getToken(getState());
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
}),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: () => `collection`,
      providesTags: ["Posts"]
    }),

    updateCollections: builder.mutation({
      query: (payload) => ({
          url: "collection/new",
          method: "POST",
          body: payload
       }),
       invalidatesTags: ["Posts"]
    }),

    getLinks: builder.query({
      query: (collection) => `collection/links?collectionName=${collection}`,
      providesTags: ["Links"]
    }),

    AddLinks: builder.mutation({
      query: (payload) => ({
          url: `collection/links/new?name=${payload.collection}`,
          method: "POST",
          body: {linkName: payload.linkName, link: payload.link}
       }),
       invalidatesTags: ["Links"]
    }),
    
  

  
  }),
});

export const { useGetCollectionsQuery, useUpdateCollectionsMutation, useAddLinksMutation, useGetLinksQuery} = jsonServerApi;