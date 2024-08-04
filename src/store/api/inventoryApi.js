import api from "./api";

export const inventoryApi = api.injectEndpoints({
  reducerPath: "inventoryApi",
  endpoints: (builder) => ({
    addItem: builder.mutation({
      query: (data) => {
        return {
          url: "item/createItem",
          method: "POST",
          body: data,
        };
      },
    }),

    getAllItems: builder.query({
      query: () => "item/getAllItems",
    }),

    getItemById: builder.query({
      query: (itemId) => `item/getItemById/${itemId}`,
    }),
  }),
});

export const { useGetAllItemsQuery, useGetItemByIdQuery, useAddItemMutation } =
  inventoryApi;
