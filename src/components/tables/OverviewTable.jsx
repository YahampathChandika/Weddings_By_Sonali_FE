import React, { useState } from "react";
import { Table } from "rsuite";
import { useGetAdmittedPatientsQuery } from "../../store/api/patientApi";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import noDataImage from "../../assets/images/doctors.svg";

export default function OverviewTable() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { Column, HeaderCell, Cell } = Table;
  const navigate = useNavigate();

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

  const AgeCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>{calculateAge(rowData[dataKey])}</Cell>
  );

  const NameCell = ({ rowData, ...props }) => (
    <Cell {...props}>{`${rowData.firstName} ${rowData.lastName}`}</Cell>
  );

  const { data: patientData, isLoading, error } = useGetAdmittedPatientsQuery();

  console.log("patientData", patientData);

  const getData = () => {
    if (error) {
      console.log("Error fetching data:", error);
      return [];
    }

    if (isLoading) {
      return [];
    }

    if (patientData && patientData?.payload?.patientsList) {
      const sortedData = [...patientData.payload.patientsList];

      if (sortColumn && sortType) {
        sortedData.sort((a, b) => {
          let x, y;

          if (sortColumn === "name") {
            x = `${a.firstName} ${a.lastName}`.toLowerCase();
            y = `${b.firstName} ${b.lastName}`.toLowerCase();
          } else {
            x = a[sortColumn];
            y = b[sortColumn];

            if (typeof x === "string") {
              x = x.toLowerCase();
            }
            if (typeof y === "string") {
              y = y.toLowerCase();
            }
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
    navigate(`/home/patientDetails/${data.id}`);
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
      renderEmpty={() => (
        <div className="flex flex-col items-center justify-center h-full bg-white">
          <img src={noDataImage} alt="No Data" className="w-56 h-auto" />
          <p className="mt-5 text-lg text-txtgray">No patients available.</p>
        </div>
      )}
    >
      <Column flexGrow={70} align="center" fixed sortable>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="hospitalId" />
      </Column>

      <Column flexGrow={130} fixed sortable>
        <HeaderCell sortColumn="name">Name</HeaderCell>
        <NameCell dataKey="name" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Age</HeaderCell>
        <AgeCell dataKey="dateOfBirth" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Gender</HeaderCell>
        <Cell dataKey="gender" />
      </Column>

      <Column flexGrow={200} sortable>
        <HeaderCell>Diagnosis</HeaderCell>
        <Cell dataKey="diagnosis" />
      </Column>

      <Column flexGrow={100} sortable>
        <HeaderCell>Alerts</HeaderCell>
        <Cell className="pl-3" dataKey="alertCount" />
      </Column>

      <Column flexGrow={120}>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="condition" />
      </Column>
    </Table>
  );
}
