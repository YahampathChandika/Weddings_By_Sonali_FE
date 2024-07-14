import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider, Modal } from "rsuite";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import { useGetAvailableBedsQuery } from "../../store/api/dropDownApi";
import {
  useCreatePatientMutation,
  useGetAdmittedPatientsQuery,
  useGetPatientListQuery,
} from "../../store/api/patientApi";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  dateOfBirth: yup.date().required("Birthday is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  contactNo: yup.string().required("Contact No is required"),
  guardianName: yup.string().required("Guardian's Name is required"),
  bedId: yup.string().required("Bed No is required"),
  bloodGroup: yup.string().required("Blood Group is required"),
  diagnosis: yup.string().required("Diagnosis is required"),
});

export default function AddPatientModal({ open, handleClose }) {
  const { data: bedsData } = useGetAvailableBedsQuery();
  const [addPatient] = useCreatePatientMutation();
  const { refetch: refetchAll } = useGetPatientListQuery();
  const { refetch: refetchAdmitted} = useGetAdmittedPatientsQuery();

  const beds = bedsData?.payload;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      hospitalId: "1",
      nic: "981234567V",
    };

    try {
      const response = await addPatient(formattedData);

      if (response.data && !response.data.error) {
        reset();
        refetchAdmitted();
        refetchAll();
        handleClose();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Patient Registered Successfully",
        });
      } else {
        console.log("User adding failed", response);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "user registration failed",
        });
      }
    } catch (error) {
      console.error("Patient Registration Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An unexpected error occurred",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose} size="lg" className="w-3/5 ">
      <Modal.Body className="!h-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center !h-16 mt-4 rounded-t-md px-10">
            <p className="font-semibold text-2xl ">Patient Registration</p>
            <div className="border-double border-4 text-txtblue border-slate-100 bg-white rounded-full h-12 w-12 items-center flex justify-center">
              <span className="material-symbols-outlined">person_add</span>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
          <div className="flex w-full mt-8 px-10">
            <p className="text-semibold text-lg w-28">Patient</p>
            <div className="flex-col w-full ml-10">
              <div className="flex space-x-10">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="First Name"
                      variant="outlined"
                      className="!mb-2 w-full"
                      error={!!errors.firstName}
                      helperText={
                        errors.firstName ? errors.firstName.message : ""
                      }
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.lastName}
                      helperText={
                        errors.lastName ? errors.lastName.message : ""
                      }
                    />
                  )}
                />
              </div>
              <div className="flex justify-between space-x-10">
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField", "DateField"]}>
                      <Controller
                        name="dateOfBirth"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                          <DateField
                            {...field}
                            label="Birthday"
                            className="!w-full !mb-5"
                            format="YYYY-MM-DD"
                            error={!!errors.dateOfBirth}
                            helperText={
                              errors.dateOfBirth
                                ? errors.dateOfBirth.message
                                : " "
                            }
                          />
                        )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      className="w-full !mb-5"
                      error={!!errors.gender}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Gender"
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                      </Select>
                      {errors.gender && (
                        <FormHelperText>{errors.gender.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      className="!mb-4 w-full"
                      error={!!errors.address}
                      helperText={errors.address ? errors.address.message : ""}
                    />
                  )}
                />
                <Controller
                  name="contactNo"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Contact No"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.contactNo}
                      helperText={
                        errors.contactNo ? errors.contactNo.message : ""
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
          <div className="flex w-full mt-8 px-10">
            <p className="text-semibold text-lg w-28">Guardian</p>
            <div className="flex-col w-full ml-10">
              <div className="flex space-x-10">
                <Controller
                  name="guardianName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic name"
                      label="Full Name"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.guardianName}
                      helperText={
                        errors.guardianName ? errors.guardianName.message : ""
                      }
                    />
                  )}
                />
              </div>
              <div className="flex space-x-10">
                <Controller
                  name="guardianAddress"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      className="!mb-4 w-full"
                      error={!!errors.address}
                      helperText={errors.address ? errors.address.message : ""}
                    />
                  )}
                />
                <Controller
                  name="guardianContactNo"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Contact No"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.contact}
                      helperText={errors.contact ? errors.contact.message : ""}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
          <div className="flex w-full mt-8 px-10">
            <p className="text-semibold text-lg w-28">Medical</p>
            <div className="flex-col w-full ml-10">
              <div className="flex space-x-10">
                <Controller
                  name="bedId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      className="w-full !mb-5"
                      error={!!errors.bedId}
                    >
                      <InputLabel id="demo-simple-select-label" className="">
                        Bed No
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Bed No"
                      >
                        {beds.map((bed) => (
                          <MenuItem key={bed.id} value={bed.id}>
                            {bed.bedNo}
                          </MenuItem>
                        ))}
                      </Select>

                      {errors.bedId && (
                        <FormHelperText>{errors.bedId.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="bloodGroup"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      className="w-full !mb-5"
                      error={!!errors.gender}
                    >
                      <InputLabel id="demo-simple-select-label" className="">
                        Blood Group
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Blood Group"
                      >
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                        <MenuItem value={"B+"}>B+</MenuItem>
                        <MenuItem value={"B-"}>B-</MenuItem>
                        <MenuItem value={"O+"}>O+</MenuItem>
                        <MenuItem value={"O-"}>O-</MenuItem>
                        <MenuItem value={"AB+"}>AB+</MenuItem>
                        <MenuItem value={"AB-"}>AB-</MenuItem>
                      </Select>

                      {errors.gender && (
                        <FormHelperText>
                          {errors.bloodGroup.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </div>
              <div className="flex-col w-full text-right">
                <Controller
                  name="diagnosis"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="diagnosis"
                      variant="outlined"
                      className="!mb-5 w-full"
                      error={!!errors.diagnosis}
                      helperText={
                        errors.diagnosis ? errors.diagnosis.message : ""
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
          <div className="w-full flex flex-row justify-end mt-8 mb-4 px-10">
            <button
              type="button"
              onClick={() => {
                handleClose();
                reset();
              }}
              className="w-1/2 h-11 rounded-md mr-4 border-solid border border-slate-300 hover:bg-slate-200 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 h-11 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
