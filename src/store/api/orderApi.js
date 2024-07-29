import api from "./api";

export const orderApi = api.injectEndpoints({
  reducerPath: "orderApi",
  endpoints: (builder) => ({
    addNewOrder: builder.mutation({
      query: (data) => {
        return {
          url: "order/addNewOrder",
          method: "POST",
          body: data,
        };
      },
    }),

    getOrdersByState: builder.query({
      query: (state) => `order/getOrdersByState/${state}`,
    }),

    getOrderMatrices: builder.query({
      query: () => "order/getOrderMatrices",
    }),
  }),
});

export const {
  useAddNewOrderMutation,
  useGetOrdersByStateQuery,
  useGetOrderMatricesQuery,
} = orderApi;
