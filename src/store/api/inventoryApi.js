import api from "./api";

export const inventoryApi = api.injectEndpoints({
  reducerPath: "inventoryApi",
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => "item/getAllItems",
    }),

    getItemById: builder.query({
      query: (itemId) => `item/getItemById/${itemId}`,
    }),

  }),
});

export const { useGetAllItemsQuery, useGetItemByIdQuery } = inventoryApi;
