import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Divider, Modal } from "rsuite";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import { useGetAdmittedPatientsQuery, useGetPatientByIdQuery, useGetPatientListQuery, useReAdmitPatientMutation } from "../../store/api/patientApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAvailableBedsQuery } from "../../store/api/dropDownApi";

export default function ReAdmit({ open, handleClose }) {
  const { id } = useParams();
  const [reAdmit] = useReAdmitPatientMutation();
  const { data: bedsData, refetch: bedsRefetch } = useGetAvailableBedsQuery();
  const { refetch: admittedRefetch } = useGetAdmittedPatientsQuery();
  const { refetch: patientsRefetch } = useGetPatientListQuery();
  const { refetch: patientRefetch } = useGetPatientByIdQuery(id);

  const navigate = useNavigate();

  const beds = bedsData?.payload || [];

  const { handleSubmit, control, reset, watch } = useForm();
  const watchedFields = watch();

  const onSubmit = async (formData) => {
    try {
      const response = await reAdmit({ id, data: formData });

      if (response.data && !response.data.error) {
        reset();
        admittedRefetch();
        patientsRefetch();
        patientRefetch();
        bedsRefetch();
        handleClose();
        navigate("/home/admitted");
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
          title: "Patient ReAdmitted!",
        });
      } else {
        console.log("Patient ReAdmitting failed!", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Failed to readmit patient!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error readmitting patient", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to readmit patient!",
      });
    }
  };

  const isFormFilled = watchedFields.bedId && watchedFields.diagnosis;

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        handleClose();
      }}
      className="!w-1/3 !mt-36"
    >
      <Modal.Body className="!h-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center !h-16 mt-4 rounded-t-md px-10">
            <p className="font-semibold text-2xl">ReAdmit Patient</p>
            <div className="border-double border-4 text-txtblue border-slate-100 bg-white rounded-full h-12 w-12 items-center flex justify-center">
              <span className="material-symbols-outlined">inpatient</span>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
          <div className="flex-col w-full mt-8 px-10">
              <div className="flex space-x-10">
                <Controller
                  name="bedId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl className="w-full !mb-5">
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
                      label="Diagnosis"
                      variant="outlined"
                      className="!mb-5 w-full"
                    />
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
              ReAdmit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
