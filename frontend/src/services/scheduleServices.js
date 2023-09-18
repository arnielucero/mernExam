import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.REACT_APP_API_URL}`;
const apiUrl = "/rest/v1/schedules";
export const api = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: () => ({
        url: apiUrl,
        method: "GET",
      }),
    }),
    getSchedule: builder.query({
      query: (id) => ({
        url: `${apiUrl}/id=${id}`,
        method: "GET",
      }),
    }),
    createSchedule: builder.mutation({
      query: (data) => ({
        url: apiUrl,
        method: 'POST',
        body: data,
      }),
    }),
    updateSchedule: builder.mutation({
      query: (data) => ({
        url: apiUrl,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `${apiUrl}/${id}`,
        method: 'DELETE',
       
      }),
    }),
  }),
});

export const { 
  useGetSchedulesQuery, 
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
  useGetScheduleQuery,
  useUpdateScheduleMutation
} = api;
export const scheduleApi = api;