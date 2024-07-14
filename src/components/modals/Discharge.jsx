import React from "react";
import { Modal, Divider } from "rsuite";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDischargePatientMutation,
  useGetAdmittedPatientsQuery,
  useGetPatientByIdQuery,
  useGetPatientListQuery,
} from "../../store/api/patientApi";
import { useGetAvailableBedsQuery } from "../../store/api/dropDownApi";

function Discharge({ open, handleClose }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [discharge] = useDischargePatientMutation();
  const { refetch: admittedRefetch } = useGetAdmittedPatientsQuery();
  const { refetch: patientsRefetch } = useGetPatientListQuery();
  const { refetch: bedsRefetch } = useGetAvailableBedsQuery();
  const { refetch: patientRefetch } = useGetPatientByIdQuery(id);


  const handleDischarge = async (data) => {
    try {
      const response = await discharge(id);
      if (response.data && !response.data.error) {
        admittedRefetch();
        patientsRefetch();
        bedsRefetch();
        patientRefetch();
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
          title: "Patient Discharged!",
        });
      } else {
        console.log("Patient Discharging failed!", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Failed to discharge patient!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Failed to discharge patient!", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to discharge patient!",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className="!w-1/4 !mt-36">
      <Modal.Body className="!h-auto">
        <div className="flex justify-between items-center !h-16 mt-4 rounded-t-md px-10">
          <p className="font-semibold text-2xl">Discharge</p>
          <div className="border-double border-4 text-red-600 border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
            <span className="material-symbols-outlined text-red">
              moving_beds
            </span>
          </div>
        </div>
        <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
        <div className="px-10">
          <p className="text-txtgray font-medium text-lg my-3">
            Are you sure you discharge this patient?
          </p>
        </div>
        <div className="w-full flex justify-between mt-6 mb-4 px-10">
          <button
            type="button"
            onClick={handleClose}
            className="w-1/2 h-10 rounded-md mr-4 border-solid border border-slate-300 transition-transform duration-300 hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handleDischarge}
            className="w-1/2 h-10 rounded-md bg-red text-white transition-transform duration-300 hover:scale-105"
          >
            Discharge
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Discharge;
