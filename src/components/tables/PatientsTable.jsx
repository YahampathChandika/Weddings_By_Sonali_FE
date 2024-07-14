import React, { useState } from "react";
import { Table } from "rsuite";
import { useNavigate } from "react-router-dom";
import noDataImage from "../../assets/images/nofound.svg";

export default function PatientsTable({ data }) {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { Column, HeaderCell, Cell } = Table;
  const navigate = useNavigate();

  const handleRowClick = (data) => {
    navigate(`/home/patientHistory/${data.id}`);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const getData = () => {
    if (data && data.length > 0) {
      const sortedData = data.map((patient) => {
        const { admissions } = patient;
        const latestAdmission =
          admissions.length > 0
            ? admissions.reduce(
                (latest, admission) =>
                  new Date(admission.createdAt) > new Date(latest.createdAt)
                    ? admission
                    : latest,
                admissions[0]
              )
            : {};

        return {
          ...patient,
          bedId: latestAdmission.bedId || "N/A",
          diagnosis: latestAdmission.diagnosis || "N/A",
          createdAt: latestAdmission.createdAt
            ? new Date(latestAdmission.createdAt).toLocaleDateString()
            : "N/A",
          dischargedOn: latestAdmission.dischargedOn
            ? new Date(latestAdmission.dischargedOn).toLocaleDateString()
            : "N/A",
        };
      });

      if (sortColumn && sortType) {
        sortedData.sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];

          if (typeof x === "string") x = x.toLowerCase();
          if (typeof y === "string") y = y.toLowerCase();

          if (x < y) return sortType === "asc" ? -1 : 1;
          if (x > y) return sortType === "asc" ? 1 : -1;
          return 0;
        });
      }

      return sortedData;
    }
    return [];
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
      renderEmpty={() => (
        <div className="flex flex-col items-center justify-center h-full bg-white">
          <img src={noDataImage} alt="No Data" className="w-56 h-auto" />
          <p className="mt-5 text-lg text-gray-600">No patients found!</p>
        </div>
      )}
    >
      <Column flexGrow={70} align="center" fixed sortable>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="hospitalId" />
      </Column>
      <Column flexGrow={130} fixed sortable>
        <HeaderCell>Name</HeaderCell>
        <Cell>{(rowData) => `${rowData.firstName} ${rowData.lastName}`}</Cell>
      </Column>
      <Column flexGrow={100} sortable>
        <HeaderCell>Admitted Date</HeaderCell>
        <Cell dataKey="createdAt" />
      </Column>
      <Column flexGrow={100} align="center" sortable>
        <HeaderCell>Bed No</HeaderCell>
        <Cell dataKey="bedId" />
      </Column>
      <Column flexGrow={150} sortable>
        <HeaderCell>Diagnosis</HeaderCell>
        <Cell dataKey="diagnosis" />
      </Column>
      <Column flexGrow={100} sortable>
        <HeaderCell>Discharged Date</HeaderCell>
        <Cell dataKey="dischargedOn" />
      </Column>
      <Column flexGrow={100} sortable>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="status" />
      </Column>
      <Column flexGrow={120} sortable>
        <HeaderCell>Actions</HeaderCell>
        <Cell>
          <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer">
            edit
          </span>
          <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer">
            delete
          </span>
        </Cell>
      </Column>
    </Table>
  );
}
