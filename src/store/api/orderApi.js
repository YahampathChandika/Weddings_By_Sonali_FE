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


  }),
});

export const {
  useAddNewOrderMutation,
  useGetOrdersByStateQuery,
  useGetOrderMatricesQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
} = orderApi;
