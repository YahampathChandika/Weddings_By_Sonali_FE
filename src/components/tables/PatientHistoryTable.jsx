import React, { useState } from "react";
import { Table } from "rsuite";
import { useGetPatientListQuery } from "../../store/api/patientApi";
import { useNavigate, useParams } from "react-router-dom";

export default function PatientHistoryTable() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { Column, HeaderCell, Cell } = Table;

  const { data: patientData, isLoading, error } = useGetPatientListQuery();
  const navigate = useNavigate();
  const { id: patientId } = useParams();

  const getData = () => {
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    if (isLoading) {
      return [];
    }

    if (patientData && patientData?.payload) {
      const patient = patientData.payload.find((p) => p.id === parseInt(patientId));

      if (!patient) {
        return [];
      }

      const sortedData = patient.admissions.map((admission, index) => ({
        ...admission,
        rowIndex: index + 1,
        hospitalId: patient.hospitalId,
        createdAt: new Date(admission.createdAt).toLocaleDateString(),
        dischargedOn: admission.dischargedOn
          ? new Date(admission.dischargedOn).toLocaleDateString()
          : "N/A",
      }));

      if (sortColumn && sortType) {
        sortedData.sort((a, b) => {
          let x, y;

          x = a[sortColumn];
          y = b[sortColumn];

          if (typeof x === "string") {
            x = x.toLowerCase();
          }
          if (typeof y === "string") {
            y = y.toLowerCase();
          }

          if (x < y) {
            return sortType === "asc" ? -1 : 1;
          }
          if (x > y) {
            return sortType === "asc" ? 1 : -1;
          }
          return 0;
        });
      }

      return sortedData;
    }
    return [];
  };

  const handleRowClick = (data) => {
    navigate(`/home/patientDetails/${data.PatientId}`);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  return (
    <Table
      height={420}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      onRowClick={handleRowClick}
      rowClassName="cursor-pointer"
    >
      <Column flexGrow={70} align="center" fixed sortable>
        <HeaderCell>#</HeaderCell>
        <Cell dataKey="rowIndex" />
      </Column>

      <Column flexGrow={100} align="center" fixed sortable>
        <HeaderCell>Bed No</HeaderCell>
        <Cell dataKey="bedId" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Diagnosis</HeaderCell>
        <Cell dataKey="diagnosis" />
      </Column>

      <Column flexGrow={100} align="center" sortable>
        <HeaderCell>Admitted Date</HeaderCell>
        <Cell dataKey="createdAt" />
      </Column>

      <Column flexGrow={100} align="center" sortable>
        <HeaderCell>Discharged Date</HeaderCell>
        <Cell dataKey="dischargedOn" />
      </Column>
    </Table>
  );
}
