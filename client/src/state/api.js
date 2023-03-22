import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), // VITE_BASE_URL from .env.local
  reducerPath: 'main',
  tagTypes: [],
  endpoints: (build) => ({
    postAiText: build.mutation({
      // post api call
      query: (payload) => ({
        url: 'openai/text', // server
        method: 'POST',
        body: payload,
      }),
    }),
    postAiCode: build.mutation({
      query: (payload) => ({
        url: 'openai/code',
        method: 'POST',
        body: payload,
      }),
    }),
    postAiAssist: build.mutation({
      query: (payload) => ({
        url: 'openai/assist',
        method: 'POST',
        body: payload,
      }),
    }),
    postLogin: build.mutation({
      query: (payload) => ({
        url: 'auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    postSignUp: build.mutation({
      query: (payload) => ({
        url: 'auth/signup',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

// hook
export const {
  usePostAiTextMutation, // endpoints: postAiText
  usePostAiCodeMutation,
  usePostAiAssistMutation,
} = api;
