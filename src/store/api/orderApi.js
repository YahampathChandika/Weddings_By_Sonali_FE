import api from "./api";

export const orderApi = api.injectEndpoints({
    reducerPath: "orderApi",
    endpoints: (builder) => ({
        newOrder: builder.mutation({
            query: (data) => {
                return {
                    url: "order/newOrder",
                    method: "POST",
                    body: data,
                };
            },
        })
    })
})

export const { useNewOrderMutation } = orderApi;