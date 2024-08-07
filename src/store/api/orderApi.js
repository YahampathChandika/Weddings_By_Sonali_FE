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

    getOrderById: builder.query({
      query: (orderId) => `order/getOrderById/${orderId}`,
    }),

    getAllOrders: builder.query({
      query: () => "order/getAllOrders",
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `order/deleteOrder/${orderId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddNewOrderMutation,
  useGetOrdersByStateQuery,
  useGetOrderMatricesQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} = orderApi;
