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

    getReleaseItemList: builder.query({
      query: (eventId) => `eventItems/getReleaseItemList/${eventId}`,
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

    returnEventItems: builder.mutation({
      query: (data) => {
        return {
          url: "eventItems/returnEventItems",
          method: "POST",
          body: data,
        };
      },
    }),

    getWashlist: builder.query({
      query: (eventId) => `eventItems/getWashlist/${eventId}`,
    }),

    markWashed: builder.mutation({
      query: (data) => {
        return {
          url: "eventItems/markWashed",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useAddEventItemsMutation,
  useGetEventItemsByIdQuery,
  useGetReleaseItemListQuery,
  useReleaseEventItemsMutation,
  useGetReturnItemsListQuery,
  useReturnEventItemsMutation,
  useGetWashlistQuery,
  useMarkWashedMutation,
} = eventItemsApi;
