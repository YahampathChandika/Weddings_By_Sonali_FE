import api from "./api";

export const eventItemsApi = api.injectEndpoints({
  reducerPath: "eventItemsApi",
  endpoints: (builder) => ({
    addEventItems: builder.mutation({
      query: (data) => {
        return {
          url: "eventItems/addEventItems",
          method: "POST",
          body: data,
        };
      },
    }),

    getEventItemsById: builder.query({
      query: (eventId) => `eventItems/getEventItemsById/${eventId}`,
    }),

    releaseEventItems: builder.mutation({
      query: (data) => {
        return {
          url: "eventItems/releaseEventItems",
          method: "POST",
          body: data,
        };
      },
    }),

    getReturnItemsList: builder.query({
      query: (eventId) => `eventItems/getReturnItemsList/${eventId}`,
    }),
  }),
});

export const {
  useAddEventItemsMutation,
  useGetEventItemsByIdQuery,
  useReleaseEventItemsMutation,
  useGetReturnItemsListQuery
} = eventItemsApi;
