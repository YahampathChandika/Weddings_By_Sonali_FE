import React from "react";
import UserDetails from "../components/common/UserDetails";
import { useGetPatientByIdQuery } from "../store/api/patientApi";
import { useParams } from "react-router-dom";
import PatientHistoryTable from "../components/tables/PatientHistoryTable";
import moment from "moment";

export default function PatientHistory() {
  const { id } = useParams();
  const { data } = useGetPatientByIdQuery(id);
  const patientData = data?.payload?.patient;

  const calculateAge = (dateOfBirth) => {
    const birthDate = moment(dateOfBirth);
    const today = moment();
    const years = today.diff(birthDate, "years");
    birthDate.add(years, "years");
    const months = today.diff(birthDate, "months");
    birthDate.add(months, "months");
    const days = today.diff(birthDate, "days");

    return `${years}Y ${months}M ${days}D`;
  };

  return (
    <div className="w-full">
      <div className="pb-10 flex justify-between">
        <div className="flex items-center mb-5">
          <span className="material-symbols-outlined text-black font-semibold">
            medical_information
          </span>
          <p className="text-2xl font-semibold ml-4">Medical History</p>
        </div>
        <UserDetails />
      </div>
      <div className="flex-col w-full bg-white rounded-md justify-between items-center py-6 mb-6">
        <div className="flex w-full justify-between items-center pl-10 pb-3">
          <div className="flex-col justify-center items-start w-1/5">
            <p className="text-txtgray">Hospital ID</p>
            <p className="text-lg font-medium mt-2">
              {patientData?.hospitalId}
            </p>
          </div>
          <div className="flex-col justify-center items-start w-1/5">
            <p className="text-txtgray">Name</p>
            <p className="text-lg font-medium mt-2">
              {patientData?.firstName} {patientData?.lastName}
            </p>
          </div>
          <div className="flex-col justify-center items-start w-1/5">
            <p className="text-txtgray">Age</p>
            <p className="text-lg font-medium mt-2">
              {calculateAge(patientData?.dateOfBirth)}
            </p>
          </div>
          <div className="flex-col justify-center items-start w-1/5">
            <p className="text-txtgray">Gender</p>
            <p className="text-lg font-medium mt-2">{patientData?.gender}</p>
          </div>
        </div>
        <div className="flex w-full justify-between items-center pl-10 pt-3">
          <div className="flex-col justify-center items-start w-1/5">
            <p className="text-txtgray">Diagnosis</p>
            <p className="text-lg font-medium mt-2">{patientData?.diagnosis}</p>
          </div>
          <div className="flex-col justify-center items-start w-1/5">
            <p className="text-txtgray">Blood Group</p>
            <p className="text-lg font-medium mt-2">
              {patientData?.bloodGroup}
            </p>
          </div>
          <div className="flex-col justify-center items-start w-1/5">
            <p className="text-txtgray">Status</p>
            <p className="text-lg font-medium mt-2">{patientData?.status}</p>
          </div>
          <div className="flex-col justify-center items-start w-1/5">
            <p className="text-txtgray">Guardian's Contact</p>
            <p className="text-lg font-medium mt-2">
              {patientData?.guardianContactNo}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-96 rounded-md mt-6 flex flex-col">
        <p className="text-lg p-10 pb-5 font-medium">Previous Admissions</p>
        <div className="flex-grow pt-2">
          <PatientHistoryTable />
        </div>
      </div>
    </div>
  );
}
