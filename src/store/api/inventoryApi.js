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

    updateItem: builder.mutation({
      query: (data) => {
        return {
          url: `item/updateItem/${data.id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),

    deleteItem: builder.mutation({
      query: (itemId) => ({
        url: `item/deleteItem/${itemId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetItemByIdQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = inventoryApi;
