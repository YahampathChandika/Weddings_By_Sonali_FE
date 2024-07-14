import api from "./api";

export const userApi = api.injectEndpoints({
  reducerPath: "userApi",
  endpoints: (builder) => ({
    getAvailableBeds: builder.query({
      query: () => "bed/getAvailableBeds",
    }),
  }),
});

export const { useGetAvailableBedsQuery } = userApi;
