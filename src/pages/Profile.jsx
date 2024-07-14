import React, { useState } from "react";
import UserDetails from "../components/common/UserDetails";
import { DateRangePicker, Divider } from "rsuite";
import VitalSignsTable from "../components/tables/VitalSignsTable";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (value) => {
    if (value) {
      setStartDate(value[0]);
      setEndDate(value[1]);
    } else {
      setStartDate(new Date());
      setEndDate(new Date());
    }
  };
  
  const tabIndicatorStyles = {
    position: "absolute",
    top: "0",
    bottom: "0",
    width: "50%",
    backgroundColor: "#5A81FA",
    borderRadius: "9999px",
    transition: "transform 0.3s ease-in-out",
    transform: activeTab === "upcoming" ? "translateX(0)" : "translateX(100%)",
  };

  return (
    <div className="w-full">
      <div className="pb-10 flex justify-between">
        <div className="flex items-center mb-5">
          <span className="material-symbols-outlined text-black font-semibold">
            person
          </span>
          <p className="text-2xl font-bold ml-4">Users</p>
        </div>
        <UserDetails />
      </div>
      <div className="flex w-full space-x-10">
        <div className="flex-col w-3/4">
          <div className="flex-col w-full bg-white rounded-md justify-between items-center py-6 mb-10">
            <div className="flex w-full justify-between items-center pl-10 pb-3">
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Hospital ID</p>
                <p className="text-lg font-medium mt-2">1003</p>
              </div>
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Name</p>
                <p className="text-lg font-medium mt-2">1003</p>
              </div>
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Age</p>
                <p className="text-lg font-medium mt-2">1003</p>
              </div>
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Gender</p>
                <p className="text-lg font-medium mt-2">1003</p>
              </div>
            </div>
            <div className="flex w-full justify-between items-center pl-10 pt-3">
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Diagnosis</p>
                <p className="text-lg font-medium mt-2">1003</p>
              </div>
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Blood Group</p>
                <p className="text-lg font-medium mt-2">1003</p>
              </div>
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Condition</p>
                <p className="text-lg font-medium mt-2">1003</p>
              </div>
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Guardian's TP</p>
                <p className="text-lg font-medium mt-2">1003</p>
              </div>
            </div>
          </div>
          <div className="flex-col w-full bg-white rounded-md justify-between items-center">
            <div className="flex items-center justify-between my-6 px-8 pt-5 ">
              <div className="flex justify-center bg-bggray border py-1 pr-2  rounded-full  w-4/12 items-center">
                <div className="relative bg-bggray rounded-full p-1 w-full">
                  <div style={tabIndicatorStyles}></div>
                  <button
                    className={`relative z-10 px-4 py-2 rounded-full font-medium focus:outline-none w-1/2 transition duration-300 ${
                      activeTab === "upcoming" ? "text-white" : "text-txtgray"
                    }`}
                    onClick={() => setActiveTab("upcoming")}
                  >
                    Table View
                  </button>
                  <button
                    className={`relative z-10 px-4 py-2 rounded-full font-medium focus:outline-none w-1/2 transition duration-300 ${
                      activeTab === "past" ? "text-white" : "text-txtgray"
                    }`}
                    onClick={() => setActiveTab("past")}
                  >
                    Chart View
                  </button>
                </div>
              </div>

              <div className="flex items-center text-txtblue text-xl  font-medium cursor-pointer">
                <DateRangePicker
                  value={[startDate, endDate]}
                  onChange={handleDateChange}
                  showOneCalendar
                  showHeader={false}
                  className="border-none"
                />
                <span className="material-symbols-outlined mr-2 ml-10">
                  heart_plus
                </span>
                Add New
              </div>
            </div>
            <VitalSignsTable/>
          </div>
        </div>
        <div className="flex-col w-1/4">
          <div className="flex-col w-full bg-white rounded-md justify-between items-center p-6">
            <div className="flex w-full justify-between">
              <p className="font-semibold text-lg">Alerts</p>
              <div className="flex items-center text-txtblue text-lg font-medium">
                <span className="material-symbols-outlined mr-2">
                  notifications_active
                </span>
                {/* Alerts | {patient.alerts === "N/A" ? "00" : patient.alerts} */}
                02
              </div>
            </div>
            <Divider className="text-txtgray !mt-3 !mb-5" />
            <div className="flex justify-between">
              <div className="flex">
                <span className="material-symbols-outlined text-red">
                  keyboard_double_arrow_up
                </span>
                <p className="font-medium	ml-2">Blood Pressure</p>
              </div>
              <p className=" text-txtgray font-medium	ml-2">160 mmHg</p>
            </div>
            <div className="flex mt-4 justify-between">
              <div className="flex">
                <span className="material-symbols-outlined text-yellow">
                  keyboard_double_arrow_down
                </span>
                <p className="font-medium	ml-2">Heart Rate</p>
              </div>
              <p className=" text-txtgray font-medium	ml-2">40 BPM</p>
            </div>
          </div>
          <div className="flex-col w-full bg-white rounded-md justify-between items-center py-6 px-5 mt-10">
            <div className="flex w-full justify-between">
              <p className="font-semibold text-lg">Medical Records</p>
              <div className="flex items-center text-txtblue text-base  font-medium cursor-pointer">
                <span className="material-symbols-outlined mr-1">note_add</span>
                Add Record
              </div>
            </div>
            <Divider className="text-txtgray !mt-3 !mb-5" />
            <div className="flex-col justify-between items-center bg-bggray rounded-md p-4 mt-5">
              <p className="text-txtgray font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu
                placerat ipsum, vitae rhoncus nisl. Donec et facilisis mauris.
                Mauris consequat dapibus tellus sit amet auctor.
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-txtdarkblue font-semibold">
                  08/12/2024 | 14:25
                </p>
                <p className="text-txtdarkblue font-semibold">Dr. John</p>
              </div>
            </div>
            <div className="flex-col justify-between items-center bg-bggray rounded-md p-4 mt-5">
              <p className="text-txtgray font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu
                placerat ipsum, vitae rhoncus nisl. Donec et facilisis mauris.
                Mauris consequat dapibus tellus sit amet auctor.
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-txtdarkblue font-semibold">
                  08/12/2024 | 14:25
                </p>
                <p className="text-txtdarkblue font-semibold">Dr. John</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
