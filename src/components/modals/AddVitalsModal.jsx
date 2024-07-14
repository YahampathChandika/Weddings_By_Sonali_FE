import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Divider, Modal } from "rsuite";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import {
  useAddVitalSignsMutation,
  useGetAdmittedPatientsQuery,
  useGetPatientByIdQuery,
  useGetPatientVitalsIdQuery,
} from "../../store/api/patientApi";
import { useParams } from "react-router-dom";

export default function AddVitalsModal({ open, handleClose }) {
  const { id } = useParams();
  const [addVitals] = useAddVitalSignsMutation();
  const { refetch: vitalsRefetch } = useGetPatientVitalsIdQuery(id);
  const { refetch: alertsRefetch } = useGetPatientByIdQuery(id);
  const { refetch: patientsRefetch } = useGetAdmittedPatientsQuery();

  const { handleSubmit, control, reset, watch } = useForm();

  const watchedFields = watch();

  const onSubmit = async (data) => {
    try {
      // Replace empty strings with null
      const dataWithNulls = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value === "" ? null : value,
        ])
      );
      const dataWithId = { ...dataWithNulls, PatientId: id };

      const response = await addVitals(dataWithId);

      if (response.data && !response.data.error) {
        reset();
        handleClose();
        vitalsRefetch();
        alertsRefetch();
        patientsRefetch();
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
          title: "Vital Signs Added Successfully",
        });
      } else {
        console.log("Vital signs adding failed!", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Failed to record vital signs!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error recording vital signs", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to record vital signs",
      });
    }
  };

  const isFormFilled = Object.values(watchedFields).some(
    (value) => value !== "" && value !== null
  );

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        handleClose();
      }}
      className="!w-2/5 !mt-36"
    >
      <Modal.Body className="!h-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center !h-16 mt-4 rounded-t-md px-10">
            <p className="font-semibold text-2xl">Add Vital Signs</p>
            <div className="border-double border-4 text-txtblue border-slate-100 bg-white rounded-full h-12 w-12 items-center flex justify-center">
              <span className="material-symbols-outlined">vital_signs</span>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
          <div className="flex flex-wrap mt-8 px-10 space-y-5">
            <div className="w-1/2 pr-2">
              <Controller
                name="heartRate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Heart Rate"
                    variant="outlined"
                    className="!my-5 w-full"
                  />
                )}
              />
            </div>
            <div className="w-1/2 pl-2">
              <Controller
                name="respiratoryRate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Respiratory Rate"
                    variant="outlined"
                    className="!mb-5 w-full"
                  />
                )}
              />
            </div>
            <div className="w-1/2 pr-2">
              <Controller
                name="supplemented_O2"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Supplemental O2"
                    variant="outlined"
                    className="!mb-5 w-full"
                  />
                )}
              />
            </div>
            <div className="w-1/2 pl-2">
              <Controller
                name="O2saturation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Oxygen Saturation"
                    variant="outlined"
                    className="!mb-5 w-full"
                  />
                )}
              />
            </div>
            <div className="w-1/2 pr-2">
              <Controller
                name="diastolicBP"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Diastolic BP"
                    variant="outlined"
                    className="!mb-5 w-full"
                  />
                )}
              />
            </div>
            <div className="w-1/2 pl-2">
              <Controller
                name="systolicBP"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Systolic BP"
                    variant="outlined"
                    className="!mb-5 w-full"
                  />
                )}
              />
            </div>
            <div className="w-1/2 pr-2">
              <Controller
                name="temperature"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Temperature"
                    variant="outlined"
                    className="!mb-5 w-full"
                  />
                )}
              />
            </div>
            <div className="w-1/2 pl-2">
              <Controller
                name="avpuScore"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl className="w-full !mb-5 !text-left">
                    <InputLabel id="avpu-score-label">AVPU Score</InputLabel>
                    <Select
                      {...field}
                      labelId="avpu-score-label"
                      id="avpu-score-select"
                      label="AVPU Score"
                    >
                      <MenuItem value="Alert">Alert</MenuItem>
                      <MenuItem value="Verbal">Verbal</MenuItem>
                      <MenuItem value="Pain">Pain</MenuItem>
                      <MenuItem value="Unresponsive">Unresponsive</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-row justify-end mt-5 mb-4 px-10">
            <button
              type="button"
              onClick={() => {
                reset();
                handleClose();
              }}
              className="w-1/2 h-10 rounded-md mr-4 border-solid border border-slate-300 hover:bg-slate-200 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormFilled}
              className={`w-1/2 h-10 rounded-md text-white transition-all duration-300 ${
                isFormFilled ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-400"
              }`}
            >
              Record
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
