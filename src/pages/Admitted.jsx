import React, { useState, useMemo } from "react";
import { AutoComplete, Col, Container, Divider, InputGroup, Row } from "rsuite";
import UserDetails from "../components/common/UserDetails";
import AddPatientModal from "../components/modals/AddPatientModal";
import { useGetAdmittedPatientsQuery } from "../store/api/patientApi";
import moment from "moment";
import { Link } from "react-router-dom";
import noDataImage from "../assets/images/doctors.svg";

export default function Admitted() {
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handlePatientModalOpen = () => setPatientModalOpen(true);
  const handlePatientModalClose = () => setPatientModalOpen(false);
  const { data: patients } = useGetAdmittedPatientsQuery();

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

  const filteredPatients = useMemo(() => {
    if (!patients?.payload?.patientsList) return [];
    return patients.payload.patientsList.filter((patient) => {
      const idMatch = patient.hospitalId.toString().includes(searchValue);
      const nameMatch = `${patient.firstName} ${patient.lastName}`
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return idMatch || nameMatch;
    });
  }, [patients, searchValue]);

  const handleSelect = (value) => {
    const selectedPatient = filteredPatients.find(
      (patient) =>
        patient.hospitalId.toString() === value ||
        `${patient.firstName} ${patient.lastName}` === value
    );
    if (selectedPatient) {
      setSearchValue(selectedPatient.hospitalId.toString());
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  return (
    <Container className="w-full">
      <Row className="pb-10 flex justify-between">
        <Row className="flex items-center mb-5">
          <span className="material-symbols-outlined sidebar-icon text-black">
            ward
          </span>
          <p className="text-2xl font-bold ml-4 text-black">
            Admitted Patients
          </p>
        </Row>
        <UserDetails />
      </Row>

      <Row className="mr-8 w-full bg-white h-20 rounded-md pl-5 flex justify-between items-center">
        <InputGroup
          inside
          className="flex border-2 border-txtdarkblue !w-2/5 min-w-48 h-10 px-3 mr-5 !rounded-full items-center justify-evenly"
        >
          <AutoComplete
            placeholder="Search by Name or ID"
            data={filteredPatients.map((patient) => ({
              label: `${patient.firstName} ${patient.lastName}`,
              value: patient.hospitalId.toString(),
            }))}
            value={searchValue}
            onChange={setSearchValue}
            onSelect={handleSelect}
          />
          <InputGroup.Addon>
            {searchValue && (
              <span
                className="material-symbols-outlined sidebar-icon text-lg font-medium text-red cursor-pointer mr-5"
                onClick={handleClearSearch}
              >
                close
              </span>
            )}
            <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue cursor-pointer">
              search
            </span>
          </InputGroup.Addon>
        </InputGroup>
        <Row
          className="min-w-52 flex items-center cursor-pointer"
          onClick={handlePatientModalOpen}
        >
          <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 ">
            add_circle
          </span>
          <p className="text-lg font-medium text-txtdarkblue">
            Add New Patient
          </p>
        </Row>
      </Row>

      {filteredPatients.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full p-36">
          <img src={noDataImage} alt="No Data" className="w-72 h-full" />
          <p className="mt-10 text-xl text-gray-600">No Admitted Patients.</p>
        </div>
      ) : (
        <Row className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 pt-5 mb-8">
          {filteredPatients.map((patient) => (
            <Link to={`/home/patientDetails/${patient.id}`} key={patient.id}>
              <div className="bg-white shadow-md rounded-lg p-5 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <span
                      className={`material-symbols-outlined mr-2 ${
                        patient.condition === "Critical"
                          ? "text-red"
                          : patient.condition === "Unstable"
                          ? "text-yellow"
                          : patient.condition === "Stable"
                          ? "text-green"
                          : ""
                      }`}
                    >
                      {patient.condition === "Critical"
                        ? "error"
                        : patient.condition === "Unstable"
                        ? "sync_problem"
                        : patient.condition === "Stable"
                        ? "check_circle"
                        : ""}
                    </span>
                    <span
                      className={`text-lg font-medium ${
                        patient.condition === "Critical"
                          ? "text-red"
                          : patient.condition === "Unstable"
                          ? "text-yellow"
                          : patient.condition === "Stable"
                          ? "text-green"
                          : ""
                      }`}
                    >
                      {patient.condition}
                    </span>
                  </div>

                  <div className="flex items-center text-txtblue text-lg font-medium">
                    <span className="material-symbols-outlined mr-2">
                      circle_notifications
                    </span>
                    Alerts | 0{patient.alertCount === "N/A" ? "0" : patient.alertCount}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg ">
                    {patient.firstName} {patient.lastName}
                  </p>
                  <p className="font-medium text-txtgray ">
                    {patient.hospitalId}
                  </p>
                </div>
                <div className="flex mt-5 justify-between">
                  <div className="flex-col">
                    <p className="text-txtgray">Bed No</p>
                    <p className="text-lg font-medium">0{patient.bedNo}</p>
                  </div>
                  <div className="flex-col text-right">
                    <p className="text-txtgray">Diagnosis</p>
                    <p className="text-lg font-medium">{patient.diagnosis}</p>
                  </div>
                </div>
                <div className="flex mt-5 justify-between">
                  <div className="flex-col">
                    <p className="text-txtgray">Age</p>
                    <p className="text-lg font-medium">
                      {calculateAge(patient.dateOfBirth)}
                    </p>
                  </div>
                  <div className="flex-col text-right">
                    <p className="text-txtgray">Admitted Date</p>
                    <p className="text-lg font-medium">{patient.createdAt}</p>
                  </div>
                </div>
                <Divider className="text-txtgray" />
                <div className="flex items-center text-txtblue text-lg font-medium">
                  Notes
                  <span className="material-symbols-outlined ml-2">
                    description
                  </span>
                </div>
                <div className="text-txtgray mt-2">
                  Has abnormal condition in heart. Check BP regularly.
                </div>
              </div>
            </Link>
          ))}
        </Row>
      )}

      <AddPatientModal
        open={patientModalOpen}
        handleClose={handlePatientModalClose}
      />
    </Container>
  );
}
