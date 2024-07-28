import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider } from "rsuite";
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

import Swal from "sweetalert2";
import UserDetails from "../components/common/UserDetails";
import { TimeField } from "@mui/x-date-pickers";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  nic: yup.string().required("NIC is required"),
  address: yup.string().required("Address is required"),
  contactNo: yup.string().required("Contact No is required"),
  eventName: yup.string().required("Event Name is required"),
  eventVenue: yup.string().required("Event Venue is required"),
  eventDate: yup.date().required("Event Date is required"),
  eventTime: yup.string().required("Event Time is required"),
  returnDate: yup.date().required("Return Date is required"),
  pax: yup.string().required("Pax count is required"),
});

export default function NewOrder() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-10 flex justify-between">
        <div className="flex items-center mb-5">
          <span className="material-symbols-outlined sidebar-icon text-black">
            add_box
          </span>
          <p className="text-2xl font-bold ml-4 text-black">New Order</p>
        </div>
        <UserDetails />
      </div>
      <div className="bg-white px-5 p-8 rounded-md">
        <div className="flex w-full mt-8 px-10">
          <p className="text-semibold text-lg w-28">Customer</p>
          <div className="flex-col w-full ml-10">
            <div className="flex space-x-10 mb-5">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic name"
                    label="Name"
                    variant="outlined"
                    className="!mb-2 w-full"
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                )}
              />
              <Controller
                name="nic"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="NIC"
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.nic}
                    helperText={errors.nic ? errors.nic.message : ""}
                  />
                )}
              />
            </div>
            <div className="flex space-x-10 mb-5">
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
          <p className="text-semibold text-lg w-28">Event</p>
          <div className="flex-col w-full ml-10">
            <div className="flex space-x-10 mb-5 h-20">
              <Controller
                name="eventName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic name"
                    label="Event Name"
                    variant="outlined"
                    className="w-full"
                    error={!!errors.eventName}
                    helperText={
                      errors.eventName ? errors.eventName.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="eventVenue"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic name"
                    label="Venue"
                    variant="outlined"
                    className="w-full"
                    error={!!errors.eventVenue}
                    helperText={
                      errors.eventVenue ? errors.eventVenue.message : ""
                    }
                  />
                )}
              />
            </div>
            <div className="flex space-x-10 mb-5  h-20">
              <div className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateField", "DateField"]}>
                    <Controller
                      name="eventDate"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <DateField
                          {...field}
                          label="Event Date"
                          className="!w-full"
                          format="YYYY-MM-DD"
                          error={!!errors.eventDate}
                          helperText={
                            errors.eventDate ? errors.eventDate.message : " "
                          }
                        />
                      )}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimeField"]}>
                    <TimeField
                      className="!w-full !mb-5"
                      label="Event Time"
                      error={!!errors.eventTime}
                      helperText={
                        errors.eventTime ? errors.eventTime.message : " "
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="flex space-x-10 h-20">
              <div className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateField", "DateField"]}>
                    <Controller
                      name="returnDate"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <DateField
                          {...field}
                          label="Return Date"
                          className="!w-full"
                          format="YYYY-MM-DD"
                          error={!!errors.returnDate}
                          helperText={
                            errors.returnDate
                              ? errors.returnDate.message
                              : " "
                          }
                        />
                      )}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <Controller
                name="pax"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Pax"
                    variant="outlined"
                    className="!mb-5 w-full !mt-2"
                    error={!!errors.pax}
                    helperText={errors.pax ? errors.pax.message : ""}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <Divider className="text-txtgray w-11/12 !mx-auto" />
        <div className="w-full flex flex-row justify-end mt-10 mb-4 pr-20 ">
          <button
            type="button"
            onClick={() => {
              handleClose();
              reset();
            }}
            className="w-5/12 h-11 rounded-md mr-4 border-solid border border-slate-300 hover:bg-slate-200 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-5/12 h-11 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
