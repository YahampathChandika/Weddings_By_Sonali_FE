import { api } from "./api";

export const allpatientApi = api.injectEndpoints({
  reducerPath: "patientRegistrationApi",
  endpoints: (build) => ({
    getPatientList: build.query({
      query: () => "patient/getAllPatients",
    }),

    getAdmittedPatients: build.query({
      query: () => "patient/admittedPatients",
    }),

    createPatient: build.mutation({
      query: (credentials) => ({
        url: "/patient/registerPatient",
        method: "POST",
        body: credentials,
      }),
    }),

    deletePatient: build.mutation({
      query: (hospitalId) => ({
        url: `patient/deletePatient/${hospitalId}`,
        method: "DELETE",
      }),
    }),

    getAllPatientMatrices: build.query({
      query: () => "patient/allPatientMatrices",
    }),

    updatePatient: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `patient/updatePatient/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),

    getPatientById: build.query({
      query: (id) => `patient/byId/${id}`,
    }),

    addVitalSigns: build.mutation({
      query: (credentials) => ({
        url: "vitals/addVitals",
        method: "POST",
        body: credentials,
      }),
    }),

    getPatientVitalsId: build.query({
      query: (PatientId) => `vitals/${PatientId}`,
    }),

    dischargePatient: build.mutation({
      query: (id) => ({
        url: `patient/dischargePatient/${id}`,
        method: "PATCH",
      }),
    }),

    reAdmitPatient: build.mutation({
      query: ({ id, data }) => ({
        url: `patient/reAdmit/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPatientListQuery,
  useGetAdmittedPatientsQuery,
  useCreatePatientMutation,
  useDeletePatientMutation,
  useGetAllPatientMatricesQuery,
  useUpdatePatientMutation,
  useGetPatientByIdQuery,
  useAddVitalSignsMutation,
  useGetPatientVitalsIdQuery,
  useDischargePatientMutation,
  useReAdmitPatientMutation,
} = allpatientApi;
