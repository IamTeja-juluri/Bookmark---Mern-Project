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

    getBookmarks: builder.query({
        query: (category) => `category/bookmark/find?category=${category}`,
    }),

    getLatestBookmarks: builder.query({
      query: (category) => `category/bookmark/latest?category=${category}`,
    })
  }),
});

export const { useGetCollectionsQuery, useGetBookmarksQuery, useGetLatestBookmarksQuery } = jsonServerApi;