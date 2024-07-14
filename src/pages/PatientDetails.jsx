import React, { useState, useRef, useEffect } from "react";
import UserDetails from "../components/common/UserDetails";
import { Divider } from "rsuite";
import VitalSignsTable from "../components/tables/VitalSignsTable";
import { useParams } from "react-router-dom";
import { useGetPatientByIdQuery } from "../store/api/patientApi";
import moment from "moment";
import AddVitalsModal from "../components/modals/AddVitalsModal";
import VitalSignsChart from "../components/charts/VitalSignsChart";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Discharge from "../components/modals/Discharge";
import ReAdmit from "../components/modals/ReAdmit";

export default function PatientDetails() {
  const [activeTab, setActiveTab] = useState("table");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [dischargeModalOpen, setDischargeModalOpen] = useState(false);
  const [reAdmitModalOpen, setReAdmitModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef(null);

  const handleUserModalOpen = () => setUserModalOpen(true);
  const handleUserModalClose = () => setUserModalOpen(false);
  const handleDischargeModalOpen = () => setDischargeModalOpen(true);
  const handleDischargeModalClose = () => setDischargeModalOpen(false);
  const handleReAdmitModalOpen = () => setReAdmitModalOpen(true);
  const handleReAdmitModalClose = () => setReAdmitModalOpen(false);
  const { id } = useParams();
  const { data } = useGetPatientByIdQuery(id);

  const patientData = data?.payload?.patient;
  const patientAlerts = data?.payload?.alerts;
  const patientCondition = data?.payload?.condition;
  const borderlineAlerts = patientAlerts?.borderlineAlerts || [];
  const criticalAlerts = patientAlerts?.criticalAlerts || [];

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

  const tabIndicatorStyles = {
    position: "absolute",
    top: "0",
    bottom: "0",
    width: "50%",
    backgroundColor: "#5A81FA",
    borderRadius: "9999px",
    transition: "transform 0.3s ease-in-out",
    transform: activeTab === "table" ? "translateX(0)" : "translateX(100%)",
  };

  const handleOutsideClick = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setCalendarVisible(false);
    }
  };

  const handleClearDateRange = () => {
    setDateRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
  };

  useEffect(() => {
    if (calendarVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [calendarVisible]);

  return (
    <div className="w-full">
      <div className="pb-10 flex justify-between">
        <div className="flex items-center mb-5">
          <span className="material-symbols-outlined text-black font-semibold">
            medical_information
          </span>
          <p className="text-2xl font-semibold ml-4">Medical Details</p>
        </div>
        <UserDetails />
      </div>
      <div className="flex w-full space-x-10">
        <div className="flex-col w-3/4">
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
                <p className="text-lg font-medium mt-2">
                  {patientData?.gender}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-between items-center pl-10 pt-3">
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Diagnosis</p>
                <p className="text-lg font-medium mt-2">
                  {patientData?.diagnosis}
                </p>
              </div>
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Blood Group</p>
                <p className="text-lg font-medium mt-2">
                  {patientData?.bloodGroup}
                </p>
              </div>
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Condition</p>
                <p className="text-lg font-medium mt-2">{patientCondition}</p>
              </div>
              <div className="flex-col justify-center items-start w-1/5">
                <p className="text-txtgray">Guardian's Contact</p>
                <p className="text-lg font-medium mt-2">
                  {patientData?.guardianContactNo}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-col w-full bg-white rounded-md justify-between items-center">
            <div className="flex items-center justify-between py-6 px-8 mb-6">
              <div className="flex justify-center bg-bggray border py-1 pr-2 rounded-full w-4/12 items-center">
                <div className="relative bg-bggray rounded-full p-1 w-full">
                  <div style={tabIndicatorStyles}></div>
                  <button
                    className={`relative z-10 px-4 py-2 rounded-full font-medium focus:outline-none w-1/2 transition duration-300 ${
                      activeTab === "table" ? "text-white" : "text-txtgray"
                    }`}
                    onClick={() => setActiveTab("table")}
                  >
                    Table View
                  </button>
                  <button
                    className={`relative z-10 px-4 py-2 rounded-full font-medium focus:outline-none w-1/2 transition duration-300 ${
                      activeTab === "chart" ? "text-white" : "text-txtgray"
                    }`}
                    onClick={() => setActiveTab("chart")}
                  >
                    Chart View
                  </button>
                </div>
              </div>

              {/* <div className="flex w-5/12 justify-between"> */}
              <div className="relative">
                {/* <div className="relative w-7/12"> */}
                <input
                  type="text"
                  placeholder="Select Date Range"
                  className="border rounded-md px-4 py-2 cursor-pointer w-full focus:outline-none text-txtblue"
                  readOnly
                  onClick={() => setCalendarVisible(!calendarVisible)}
                  value={
                    dateRange[0].startDate && dateRange[0].endDate
                      ? `${moment(dateRange[0].startDate).format(
                          "MM/DD/YYYY"
                        )} - ${moment(dateRange[0].endDate).format(
                          "MM/DD/YYYY"
                        )}`
                      : ""
                  }
                />
                {!dateRange[0].startDate && !dateRange[0].endDate && (
                  <span
                    className="material-symbols-outlined absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-txtblue"
                    onClick={() => setCalendarVisible(!calendarVisible)}
                  >
                    date_range
                  </span>
                )}
                {dateRange[0].startDate && dateRange[0].endDate && (
                  <span
                    className="material-symbols-outlined absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-red"
                    onClick={handleClearDateRange}
                  >
                    close
                  </span>
                )}
                {calendarVisible && (
                  <div
                    ref={calendarRef}
                    className="absolute z-50 mt-2 bg-white shadow-lg rounded-md"
                    style={{ zIndex: 1000 }}
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDateRange([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      startDate={dateRange[0].startDate}
                      endDate={dateRange[0].endDate}
                      maxDate={new Date()}
                      showDateDisplay={false}
                    />
                  </div>
                )}
              </div>

              <div
                className="flex items-center text-txtblue text-xl font-medium cursor-pointer"
                onClick={handleUserModalOpen}
              >
                <span className="material-symbols-outlined mr-2 ml-10">
                  heart_plus
                </span>
                Add Vitals
              </div>
              {patientData?.status == "Admitted" ? (
                <div
                  className="flex items-center text-red text-xl font-medium cursor-pointer"
                  onClick={handleDischargeModalOpen}
                >
                  <span className="material-symbols-outlined mr-2 ml-10">
                    moving_beds
                  </span>
                  Discharge
                </div>
              ) : (
                <div
                  className="flex items-center text-txtgray text-xl font-medium cursor-pointer"
                  onClick={handleReAdmitModalOpen}
                >
                  <span className="material-symbols-outlined mr-2 ml-10">
                    inpatient
                  </span>
                  ReAdmit
                </div>
              )}

              {/* </div> */}
            </div>
          </div>
          {activeTab === "table" ? (
            <VitalSignsTable
              startDate={dateRange[0].startDate}
              endDate={dateRange[0].endDate}
            />
          ) : (
            <VitalSignsChart
              startDate={dateRange[0].startDate}
              endDate={dateRange[0].endDate}
            />
          )}
        </div>
        <div className="flex-col w-1/4">
          <div className="flex-col w-full bg-white rounded-md justify-between items-center p-6">
            <div className="flex w-full justify-between">
              <p className="font-semibold text-lg">Alerts</p>
              <div className="flex items-center text-txtblue text-lg font-medium">
                <span className="material-symbols-outlined mr-2">
                  notifications_active
                </span>
                Alerts | 0
                {patientAlerts?.totalAlertCount === "N/A"
                  ? "0"
                  : patientAlerts?.totalAlertCount}
              </div>
            </div>
            <Divider className="text-txtgray !mt-3 !mb-5" />
            {criticalAlerts?.map((alert, index) => (
              <div key={index}>
                {Object.values(alert).map((vital, idx) => (
                  <div key={idx} className="flex justify-between mt-4">
                    <div className="flex">
                      {vital?.status == "high" ? (
                        <span className="material-symbols-outlined text-red">
                          keyboard_double_arrow_up
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-red">
                          keyboard_double_arrow_down
                        </span>
                      )}
                      <p className="font-medium ml-2">{vital.name}</p>
                    </div>
                    <p className="text-txtgray font-medium ml-2">
                      {vital.text} | {vital.value}
                    </p>
                  </div>
                ))}
              </div>
            ))}
            {borderlineAlerts?.map((alert, index) => (
              <div key={index}>
                {Object.values(alert).map((vital, idx) => (
                  <div key={idx} className="flex justify-between mt-4">
                    <div className="flex">
                      {vital?.status == "high" ? (
                        <span className="material-symbols-outlined text-yellow">
                          keyboard_arrow_up
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-yellow">
                          keyboard_arrow_down
                        </span>
                      )}
                      <p className="font-medium ml-2">{vital.name}</p>
                    </div>
                    <p className="text-txtgray font-medium ml-2">
                      {vital.text} | {vital.value}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex-col w-full bg-white rounded-md justify-between items-center py-6 px-5 mt-10">
            <div className="flex w-full justify-between">
              <p className="font-semibold text-lg">Medical Records</p>
              <div className="flex items-center text-txtblue text-base font-medium cursor-pointer">
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
      <AddVitalsModal open={userModalOpen} handleClose={handleUserModalClose} />
      <Discharge
        open={dischargeModalOpen}
        handleClose={handleDischargeModalClose}
      />
      <ReAdmit open={reAdmitModalOpen} handleClose={handleReAdmitModalClose} />
    </div>
  );
}
