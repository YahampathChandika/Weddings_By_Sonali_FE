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
        getWaitingOrders: builder.query({
            query: () => "order/getWaitingOrders",
        })
    })
})

export const { useAddNewOrderMutation } = orderApi;