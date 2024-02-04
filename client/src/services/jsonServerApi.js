import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = (state) => state.user?.userInfo?.accessToken || "";

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookmarkclub-yd05.onrender.com/api/v1",
    prepareHeaders: async (headers, { getState }) => {
      const token = getToken(getState());
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({

    getCollections: builder.query({
      query: () => `collection`,
      providesTags: ["Posts"],
    }),

    updateCollections: builder.mutation({
      query: (payload) => ({
        url: "collection/new",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Posts"],
    }),

    getLinks: builder.query({
      query: (collectionId) => `/collection/links?collectionId=${collectionId}`,
      providesTags: ["Links"],
    }),

    AddLinks: builder.mutation({
      query: (payload) => ({
        url: `/collection/links/new?collectionId=${payload.state.collectionId}&authorId=${payload.state.authorId}`,
        method: "POST",
        body: { linkName: payload.linkName, link: payload.link },
      }),
      invalidatesTags: ["Links"],
    }),

    logoutUser: builder.query({
      query: () => `https://bookmarkclub-yd05.onrender.com/api/v1/user/logout`,
      invalidatesTags: ["Posts"],
    }),

    loginUser: builder.mutation({
      query: (payload) => ({
        url: `https://bookmarkclub-yd05.onrender.com/api/v1/user/login`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Posts"],
    }),

    toggleLike: builder.mutation({
      query: (payload) => ({
        url: `https://bookmarkclub-yd05.onrender.com/api/v1/collection/likes/${payload.collectionId}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["likes"],
    }),

    getLikes: builder.query({
      query: (collectionId) =>
        `https://bookmarkclub-yd05.onrender.com/api/v1/collection/likes/${collectionId}`,
      providesTags: ["likes"],
    }),

    editCollections: builder.mutation({
      query: (payload) => ({
        url: `http://localhost:5000/api/v1/collection/?collectionId=${payload.collectionData._id}&authorId=${payload.collectionData.userId}`,
        method: "PATCH",
        body: { name: payload.name, description: payload.description },
      }),
      invalidatesTags: ["Posts"],
    }),

    deleteCollections: builder.mutation({
      query: (payload) => ({
        url: `http://localhost:5000/api/v1/collection/?collectionId=${payload._id}&authorId=${payload.userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useUpdateCollectionsMutation,
  useAddLinksMutation,
  useGetLinksQuery,
  useLogoutUserQuery,
  useLoginUserMutation,
  useToggleLikeMutation,
  useGetLikesQuery,
  useEditCollectionsMutation,
  useDeleteCollectionsMutation,
} = jsonServerApi;
