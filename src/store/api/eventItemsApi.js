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

    getItemById: builder.query({
      query: (itemId) => `item/getItemById/${itemId}`,
    }),
  }),
});

export const { useAddEventItemsMutation, useGetItemByIdQuery } = eventItemsApi;
