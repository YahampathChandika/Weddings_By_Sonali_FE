import React, { useState, useMemo } from "react";
import { AutoComplete, Col, Container, InputGroup, Row } from "rsuite";
import PatientsTable from "../components/tables/PatientsTable";
import AddPatientModal from "../components/modals/AddPatientModal";
import UserDetails from "../components/common/UserDetails";
import { useGetPatientListQuery } from "../store/api/patientApi";

export default function Patients() {
  const { data: patientData, isLoading, error } = useGetPatientListQuery();
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handlePatientModalOpen = () => setPatientModalOpen(true);
  const handlePatientModalClose = () => setPatientModalOpen(false);

  const totalPatients = patientData?.payload?.length || 0;
  const admittedPatients =
    patientData?.payload?.filter((patient) => patient.status === "Admitted")
      .length || 0;
  const dischargedPatients = totalPatients - admittedPatients;

  const filteredPatients = useMemo(() => {
    if (!patientData?.payload) return [];
    return patientData.payload.filter((patient) => {
      const idMatch = patient.hospitalId.toString().includes(searchValue);
      const nameMatch = `${patient.firstName} ${patient.lastName}`
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return idMatch || nameMatch;
    });
  }, [patientData, searchValue]);

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
            patient_list
          </span>
          <p className="text-2xl font-bold ml-4">Patients</p>
        </Row>
        <UserDetails />
      </Row>
      <Row className="flex-col">
        <Row className="mr-8 w-full bg-white h-20 rounded-md pl-5 flex justify-between items-center">
          <InputGroup
            inside
            className="flex border-2 !w-2/5 min-w-48 h-10 px-3 mr-5 !rounded-full items-center justify-evenly"
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
        <Row className="mr-8 w-full flex mt-6 justify-between items-center">
          <Row className="bg-white w-3/12 h-28 rounded-md py-3 px-5 flex justify-between items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <Col>
              <p className="text-lg font-medium">Total</p>
              <p className="text-xs text-txtgray">All</p>
              <p className="text-2xl text-txtblue mt-3">0{totalPatients}</p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                ward
              </span>
            </Col>
          </Row>
          <Row className="bg-white w-3/12 h-28 rounded-md py-3 px-5 flex justify-between items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <Col>
              <p className="text-lg font-medium">Admitted</p>
              <p className="text-xs text-txtgray">Current</p>
              <p className="text-2xl text-txtblue mt-3">0{admittedPatients}</p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                inpatient
              </span>
            </Col>
          </Row>
          <Row className="bg-white w-3/12 h-28 rounded-md py-3 px-5 flex justify-between items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <Col>
              <p className="text-lg font-medium">Discharged</p>
              <p className="text-xs text-txtgray">Past</p>
              <p className="text-2xl text-txtblue mt-3">
                0{dischargedPatients}
              </p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                moving_beds
              </span>
            </Col>
          </Row>
        </Row>
      </Row>
      <Row className="bg-white h-96 rounded-md mt-6 flex flex-col">
        <p className="text-lg p-5 font-medium">Patients' Details</p>
        <div className="flex-grow">
          <PatientsTable data={filteredPatients} />
        </div>
      </Row>
      <AddPatientModal
        open={patientModalOpen}
        handleClose={handlePatientModalClose}
      />
    </Container>
  );
}
