import api from "./api";

export const inventoryApi = api.injectEndpoints({
  reducerPath: "inventoryApi",
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => "item/getAllItems",
    }),
  }),
});

export const { useGetAllItemsQuery } = inventoryApi;
